import Easing from './Easing';

/**
 * Tween class
 *
 * @class
 * @memberof PIXI.tween
 */
export default class Tween extends PIXI.utils.EventEmitter {
    /**
     * @param {*} target - Target object to tween
     * @param {PIXI.tween.TweenManager} manager - Tween manager to handle this tween
     */
    constructor(target, manager) {
        super();
        this.target = target;
        if (manager) {
            this.addTo(manager);
        }
        this.clear();
    }

    /**
     * Add the tween to a manager
     *
     * @param {PIXI.tween.TweenManager} manager - Tween manager to handle this tween
     */
    addTo(manager) {
        this.manager = manager;
        this.manager.addTween(this);

        return this;
    }

    /**
     * Chain another tween to play after this tween has ended
     *
     * @param {PIXI.tween.Tween} tween - Tween to chain
     * @returns {PIXI.tween.Tween}
     */
    chain(tween) {
        if (!tween) {
            tween = new Tween(this.target);
        }
        this._chainTween = tween;

        return tween;
    }

    /**
     * Starts the tween playing
     *
     * @param {Promise} resolve - Promise to resolve when the tween has ended
     * @returns {PIXI.tween.Tween}
     */
    start(resolve) {
        this.active = true;
        this.isStarted = false;

        if (!this._resolvePromise && resolve) {
            this._resolvePromise = resolve;
        }

        return this;
    }

    /**
     * Starts the tween playing, whilst returning a new promise
     *
     * @returns {Promise}
     */
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

    /**
     * Stop the tweens progress
     *
     * @param {boolean} [end=false] - Force end to be called
     * @returns {PIXI.tween.Tween}
     */
    stop(end = false) {
        this.active = false;
        this.emit('stop');

        if (end) {
            this._end();
        }

        return this;
    }

     /**
     * Set the end data for the tween
     *
     * @param {Object} data - Object containing end point data for the tween
     * @returns {PIXI.tween.Tween}
     */
    to(data = {}) {
        this._to = data;

        return this;
    }

    /**
     * Set the start point data for the tween.
     * If nothing is set, data is reset so that starting the tween will use the objects current state as the start point
     *
     * @param {Object} [data={}] - Object containing start point data for the tween
     * @returns {PIXI.tween.Tween}
     */
    from(data = {}) {
        this._from = data;

        return this;
    }

    /**
     * Remove the tween from the manager if it has one
     *
     * @returns {PIXI.tween.Tween}
     */
    remove() {
        if (!this.manager) {
            return this;
        }

        this.manager.removeTween(this);

        return this;
    }

    /**
     * Clears all class data, meaning that the tween will now do nothing if start is called
     */
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

    /**
     * Resets the tween to it's default state, but keeping any to and from data, so start can be called to replay the tween
     *
     * @returns {PIXI.tween.Tween}
     */
    reset() {
        this.elapsedTime = 0;
        this._repeat = 0;
        this._delayTime = 0;
        this.isStarted = false;
        this.isEnded = false;

        if (this.pingPong && this._pingPong) {
            const _to = this._to;
            const _from = this._from;

            this._to = _from;
            this._from = _to;

            this._pingPong = false;
        }

        return this;
    }

    /**
     * Set the start point data for the tween.
     * If nothing is set, data is reset so that starting the tween will use the objects current state as the start point
     *
     * @param {delta} [data={}]- Scalar time value from last update to this update.
     * @param {number} deltaMS - Time elapsed in milliseconds from last update to this update.
     */
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

        const time = (this.pingPong) ? this._time / 2 : this._time;
        let _to;
        let _from;

        if (time > this.elapsedTime) {
            const t = this.elapsedTime + deltaMS;
            const ended = (t >= time);

            this.elapsedTime = ended ? time : t;
            this._apply(time);

            const realElapsed = this._pingPong ? time + this.elapsedTime : this.elapsedTime;

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

    /**
     * The current elapsed progress time in ms for the tween.
     * Defaults to 1 rather than 0, as a hack around a bug of starting a tween with 0 time, and nothing happens
     *
     * @member {number}
     */
    get time() {
        return this._time;
    }

    set time(value) { // eslint-disable-line require-jsdoc
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
        } else if (this._resolvePromise) {
            const resolvePromise = this._resolvePromise;

            this._resolvePromise = null;
            resolvePromise();
        }
    }

    _parseData() {
        if (this.isStarted) {
            return;
        }

        _parseRecursiveData(this._to, this._from, this.target);

        if (this.path) {
            const distance = this.path.totalDistance();

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
            const time = (this.pingPong) ? this._time / 2 : this._time;
            const b = this.pathFrom;
            const c = this.pathTo - this.pathFrom;
            const d = time;
            const t = this.elapsedTime / d;

            const distance = b + (c * this.easing(t));
            const pos = this.path.getPointAtDistance(distance);

            this.target.position.set(pos.x, pos.y);
        }
    }

    _canUpdate() {
        return (this._time && this.active && this.target);
    }
}

function _recursiveApplyTween(to, from, target, time, elapsed, easing) {
    for (const k in to) {
        if (!_isObject(to[k])) {
            const b = from[k];
            const c = to[k] - from[k];
            const d = time;
            const t = elapsed / d;

            target[k] = b + (c * easing(t));
        } else {
            _recursiveApplyTween(to[k], from[k], target[k], time, elapsed, easing);
        }
    }
}

function _parseRecursiveData(to, from, target) {
    for (const k in to) {
        if (from[k] !== 0 && !from[k]) {
            if (_isObject(target[k])) {
                from[k] = {};
                _parseRecursiveData(to[k], from[k], target[k]);
            } else {
                from[k] = target[k];
            }
        }
    }
}

function _isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
