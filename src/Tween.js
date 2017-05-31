import * as PIXI from 'pixi.js';
import Easing from './Easing';

export default class Tween extends PIXI.utils.EventEmitter{
    constructor(target, manager) {
        super();
        this.target = target;
        if (manager) {
            this.addTo(manager);
        }
        this.clear();
    }

    addTo(manager) {
        this.manager = manager;
        this.manager.addTween(this);

        return this;
    }

    chain(tween) {
        if (!tween) {
            tween = new Tween(this.target);
        }
        this._chainTween = tween;

        return tween;
    }

    start(resolve) {
        this.active = true;
        this.isStarted = false;

        if (!this._resolvePromise && resolve) {
            this._resolvePromise = resolve;
        }

        return this;
    }

    startPromise() {
        if (!Promise) {
            return this.start();
        }

        if (this._resolvePromise) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            this.start(resolve);
        });
  	}

    stop(end = false) {
        this.active = false;
        this.emit('stop');

        if (end) {
          this._end();
        }

        return this;
    }

    to(data = {}) {
        this._to = data;

        return this;
    }

    from(data = {}) {
        this._from = data;

        return this;
    }

    remove() {
        if (!this.manager) {
            return this;
        }

        this.manager.removeTween(this);

        return this;
    }

    clear() {
        this._time = 1;
        this.active = false;
        this.easing = Easing.linear();
        this.expire = false;
        this.repeat = 0;
        this.loop = false;
        this.delay = 0;
        this.pingPong = false;
        this.isStarted = false;
        this.isEnded = false;

        this._to = {};
        this._from = {};
        this._delayTime = 0;
        this.elapsedTime = 0;
        this._repeat = 0;
        this._pingPong = false;

        this._chainTween = null;

        this.path = null;
        this.pathReverse = false;
        this.pathFrom = 0;
        this.pathTo = 0;

        this._resolvePromise = null;
    }

    reset() {
        this.elapsedTime = 0;
        this._repeat = 0;
        this._delayTime = 0;
        this.isStarted = false;
        this.isEnded = false;

        if (this.pingPong && this._pingPong) {
            let _to = this._to;
            let _from = this._from;
            this._to = _from;
            this._from = _to;

            this._pingPong = false;
        }

        return this;
    }

    update(delta, deltaMS) {
        if (!this._canUpdate() && (this._to || this.path)) {
            return;
        }

        if (this.delay > this._delayTime) {
            this._delayTime += deltaMS;
            return;
        }

        if (!this.isStarted) {
            this._parseData();
            this.isStarted = true;
            this.isEnded = false;
            this.emit('start');
        }

        let time = (this.pingPong) ? this._time / 2 : this._time;
        let _to;
        let _from;

        if (time > this.elapsedTime) {
            let t = this.elapsedTime + deltaMS;
            let ended = (t >= time);

            this.elapsedTime = ended ? time : t;
            this._apply(time);

            let realElapsed = this._pingPong ? time + this.elapsedTime : this.elapsedTime;
            this.emit('update', realElapsed);

            if (ended) {
                if (this.pingPong && !this._pingPong) {
                    this._pingPong = true;
                    _to = this._to;
                    _from = this._from;
                    this._from = _to;
                    this._to = _from;

                    if (this.path) {
                        _to = this.pathTo;
                        _from = this.pathFrom;
                        this.pathTo = _from;
                        this.pathFrom = _to;
                    }

                    this.emit('pingpong');
                    this.elapsedTime = 0;
                    return;
                }

                if (this.loop || this.repeat > this._repeat) {
                    ++this._repeat;
                    this.emit('repeat', this._repeat);
                    this.elapsedTime = 0;

                    if (this.pingPong && this._pingPong) {
                        _to = this._to;
                        _from = this._from;
                        this._to = _from;
                        this._from = _to;

                        if (this.path) {
                            _to = this.pathTo;
                            _from = this.pathFrom;
                            this.pathTo = _from;
                            this.pathFrom = _to;
                        }

                        this._pingPong = false;
                    }
                    return;
                }

                this._end();
            }
            return;
        }
    }

    get time() {
        return this._time;
    }

    set time(value) {
        this._time = value || 1;
    }

    _end() {
        this.isEnded = true;
        this.active = false;
        this.emit('end');
        this.elapsedTime = 0;

        if (this._chainTween) {
            if (!this._chainTween.manager) {
                this._chainTween.addTo(this.manager);
            }
            this._chainTween.start(this._resolvePromise);
            this._resolvePromise = null;
        } else {
            if (this._resolvePromise) {
                const resolvePromise = this._resolvePromise;
                this._resolvePromise = null;
                resolvePromise();
            }
        }
    }

    _parseData() {
        if (this.isStarted) {
            return;
        }

        _parseRecursiveData(this._to, this._from, this.target);

        if (this.path) {
            let distance = this.path.totalDistance();
            if (this.pathReverse) {
                this.pathFrom = distance;
                this.pathTo = 0;
            } else {
                this.pathFrom = 0;
                this.pathTo = distance;
            }
        }
    }

    _apply(time) {
        _recursiveApplyTween(this._to, this._from, this.target, time, this.elapsedTime, this.easing);

        if (this.path) {
            let time = (this.pingPong) ? this._time/2 : this._time;
            let b = this.pathFrom;
            let c = this.pathTo - this.pathFrom;
            let d = time;
            let t = this.elapsedTime / d;

            let distance = b + (c * this.easing(t));
            let pos = this.path.getPointAtDistance(distance);
            this.target.position.set(pos.x, pos.y);
        }
    }

    _canUpdate() {
        return (this._time && this.active && this.target);
    }
}

function _recursiveApplyTween(to, from, target, time, elapsed, easing) {
    for (let k in to) {
        if (!_isObject(to[k])) {
            let b = from[k];
            let c = to[k] - from[k];
            let d = time;
            let t = elapsed / d;
            target[k] = b + (c * easing(t));
        } else {
            _recursiveApplyTween(to[k], from[k], target[k], time, elapsed, easing);
        }
    }
}

function _parseRecursiveData(to, from, target) {
    for (let k in to) {
        if (from[k] !== 0 && !from[k]) {
            if (_isObject(target[k])) {
                from[k] = JSON.parse(JSON.stringify(target[k]));
                _parseRecursiveData(to[k], from[k], target[k]);
            } else {
                from[k] = target[k];
            }
        }
    }
}

function _isObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}
