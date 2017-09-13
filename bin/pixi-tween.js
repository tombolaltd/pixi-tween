/*!
 * pixi-tween - v0.5.0
 * Compiled Wed, 13 Sep 2017 08:36:22 UTC
 *
 * pixi-tween is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.__pixiTween = factory());
}(this, (function () { 'use strict';

if (typeof PIXI === 'undefined') { throw 'PixiJS is required'; }

var Easing = {
    linear: function linear() {
        return function (t) {
            return t;
        };
    },
    inQuad: function inQuad() {
        return function (t) {
            return t * t;
        };
    },
    outQuad: function outQuad() {
        return function (t) {
            return t * (2 - t);
        };
    },
    inOutQuad: function inOutQuad() {
        return function (t) {
            t *= 2;
            if (t < 1) return 0.5 * t * t;

            return -0.5 * (--t * (t - 2) - 1);
        };
    },
    inCubic: function inCubic() {
        return function (t) {
            return t * t * t;
        };
    },
    outCubic: function outCubic() {
        return function (t) {
            return --t * t * t + 1;
        };
    },
    inOutCubic: function inOutCubic() {
        return function (t) {
            t *= 2;
            if (t < 1) return 0.5 * t * t * t;
            t -= 2;

            return 0.5 * (t * t * t + 2);
        };
    },
    inQuart: function inQuart() {
        return function (t) {
            return t * t * t * t;
        };
    },
    outQuart: function outQuart() {
        return function (t) {
            return 1 - --t * t * t * t;
        };
    },
    inOutQuart: function inOutQuart() {
        return function (t) {
            t *= 2;
            if (t < 1) return 0.5 * t * t * t * t;
            t -= 2;

            return -0.5 * (t * t * t * t - 2);
        };
    },
    inQuint: function inQuint() {
        return function (t) {
            return t * t * t * t * t;
        };
    },
    outQuint: function outQuint() {
        return function (t) {
            return --t * t * t * t * t + 1;
        };
    },
    inOutQuint: function inOutQuint() {
        return function (t) {
            t *= 2;
            if (t < 1) return 0.5 * t * t * t * t * t;
            t -= 2;

            return 0.5 * (t * t * t * t * t + 2);
        };
    },
    inSine: function inSine() {
        return function (t) {
            return 1 - Math.cos(t * Math.PI / 2);
        };
    },
    outSine: function outSine() {
        return function (t) {
            return Math.sin(t * Math.PI / 2);
        };
    },
    inOutSine: function inOutSine() {
        return function (t) {
            return 0.5 * (1 - Math.cos(Math.PI * t));
        };
    },
    inExpo: function inExpo() {
        return function (t) {
            return t === 0 ? 0 : Math.pow(1024, t - 1);
        };
    },
    outExpo: function outExpo() {
        return function (t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        };
    },
    inOutExpo: function inOutExpo() {
        return function (t) {
            if (t === 0) return 0;
            if (t === 1) return 1;
            t *= 2;
            if (t < 1) return 0.5 * Math.pow(1024, t - 1);

            return 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
        };
    },
    inCirc: function inCirc() {
        return function (t) {
            return 1 - Math.sqrt(1 - t * t);
        };
    },
    outCirc: function outCirc() {
        return function (t) {
            return Math.sqrt(1 - --t * t);
        };
    },
    inOutCirc: function inOutCirc() {
        return function (t) {
            t *= 2;
            if (t < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);

            return 0.5 * (Math.sqrt(1 - (t - 2) * (t - 2)) + 1);
        };
    },
    inElastic: function inElastic() {
        var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.1;
        var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.4;

        return function (t) {
            var s = void 0;

            if (t === 0) return 0;
            if (t === 1) return 1;
            if (!a || a < 1) {
                a = 1;s = p / 4;
            } else s = p * Math.asin(1 / a) / (2 * Math.PI);

            return -(a * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - s) * (2 * Math.PI) / p));
        };
    },
    outElastic: function outElastic() {
        var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.1;
        var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.4;

        return function (t) {
            var s = void 0;

            if (t === 0) return 0;
            if (t === 1) return 1;
            if (!a || a < 1) {
                a = 1;s = p / 4;
            } else s = p * Math.asin(1 / a) / (2 * Math.PI);

            return a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1;
        };
    },
    inOutElastic: function inOutElastic() {
        var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.1;
        var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.4;

        return function (t) {
            var s = void 0;

            if (t === 0) return 0;
            if (t === 1) return 1;
            if (!a || a < 1) {
                a = 1;s = p / 4;
            } else s = p * Math.asin(1 / a) / (2 * Math.PI);
            t *= 2;
            if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - s) * (2 * Math.PI) / p));

            return a * Math.pow(2, -10 * (t - 1)) * Math.sin((t - 1 - s) * (2 * Math.PI) / p) * 0.5 + 1;
        };
    },
    inBack: function inBack(v) {
        return function (t) {
            var s = v || 1.70158;

            return t * t * ((s + 1) * t - s);
        };
    },
    outBack: function outBack(v) {
        return function (t) {
            var s = v || 1.70158;

            return --t * t * ((s + 1) * t + s) + 1;
        };
    },
    inOutBack: function inOutBack(v) {
        return function (t) {
            var s = (v || 1.70158) * 1.525;

            t *= 2;
            if (t < 1) return 0.5 * (t * t * ((s + 1) * t - s));

            return 0.5 * ((t - 2) * (t - 2) * ((s + 1) * (t - 2) + s) + 2);
        };
    },
    inBounce: function inBounce() {
        return function (t) {
            return 1 - Easing.outBounce()(1 - t);
        };
    },
    outBounce: function outBounce() {
        return function (t) {
            if (t < 1 / 2.75) {
                return 7.5625 * t * t;
            } else if (t < 2 / 2.75) {
                t = t - 1.5 / 2.75;

                return 7.5625 * t * t + 0.75;
            } else if (t < 2.5 / 2.75) {
                t = t - 2.25 / 2.75;

                return 7.5625 * t * t + 0.9375;
            }
            t -= 2.625 / 2.75;

            return 7.5625 * t * t + 0.984375;
        };
    },
    inOutBounce: function inOutBounce() {
        return function (t) {
            if (t < 0.5) return Easing.inBounce()(t * 2) * 0.5;

            return Easing.outBounce()(t * 2 - 1) * 0.5 + 0.5;
        };
    },
    customArray: function customArray(arr) {
        if (!arr) return Easing.linear();

        return function (t) {
            // todo: convert array => ease
            return t;
        };
    }
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
 * Tween class
 *
 * @class
 * @memberof PIXI.tween
 */

var Tween = function (_PIXI$utils$EventEmit) {
    inherits(Tween, _PIXI$utils$EventEmit);

    /**
     * @param {*} target - Target object to tween
     * @param {PIXI.tween.TweenManager} manager - Tween manager to handle this tween
     */
    function Tween(target, manager) {
        classCallCheck(this, Tween);

        var _this = possibleConstructorReturn(this, (Tween.__proto__ || Object.getPrototypeOf(Tween)).call(this));

        _this.target = target;
        if (manager) {
            _this.addTo(manager);
        }
        _this.clear();
        return _this;
    }

    /**
     * Add the tween to a manager
     *
     * @param {PIXI.tween.TweenManager} manager - Tween manager to handle this tween
     */


    createClass(Tween, [{
        key: 'addTo',
        value: function addTo(manager) {
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

    }, {
        key: 'chain',
        value: function chain(tween) {
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

    }, {
        key: 'start',
        value: function start(resolve) {
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

    }, {
        key: 'startPromise',
        value: function startPromise() {
            var _this2 = this;

            if (!Promise) {
                return this.start();
            }

            if (this._resolvePromise) {
                return Promise.resolve();
            }

            return new Promise(function (resolve, reject) {
                _this2.start(resolve);
            });
        }

        /**
         * Stop the tweens progress
         *
         * @param {boolean} [end=false] - Force end to be called
         * @returns {PIXI.tween.Tween}
         */

    }, {
        key: 'stop',
        value: function stop() {
            var end = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

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

    }, {
        key: 'to',
        value: function to() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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

    }, {
        key: 'from',
        value: function from() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this._from = data;

            return this;
        }

        /**
         * Remove the tween from the manager if it has one
         *
         * @returns {PIXI.tween.Tween}
         */

    }, {
        key: 'remove',
        value: function remove() {
            if (!this.manager) {
                return this;
            }

            this.manager.removeTween(this);

            return this;
        }

        /**
         * Clears all class data, meaning that the tween will now do nothing if start is called
         */

    }, {
        key: 'clear',
        value: function clear() {
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

    }, {
        key: 'reset',
        value: function reset() {
            this.elapsedTime = 0;
            this._repeat = 0;
            this._delayTime = 0;
            this.isStarted = false;
            this.isEnded = false;

            if (this.pingPong && this._pingPong) {
                var _to = this._to;
                var _from = this._from;

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

    }, {
        key: 'update',
        value: function update(delta, deltaMS) {
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

            var time = this.pingPong ? this._time / 2 : this._time;
            var _to = void 0;
            var _from = void 0;

            if (time > this.elapsedTime) {
                var t = this.elapsedTime + deltaMS;
                var ended = t >= time;

                this.elapsedTime = ended ? time : t;
                this._apply(time);

                var realElapsed = this._pingPong ? time + this.elapsedTime : this.elapsedTime;

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

    }, {
        key: '_end',
        value: function _end() {
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
                var resolvePromise = this._resolvePromise;

                this._resolvePromise = null;
                resolvePromise();
            }
        }
    }, {
        key: '_parseData',
        value: function _parseData() {
            if (this.isStarted) {
                return;
            }

            _parseRecursiveData(this._to, this._from, this.target);

            if (this.path) {
                var distance = this.path.totalDistance();

                if (this.pathReverse) {
                    this.pathFrom = distance;
                    this.pathTo = 0;
                } else {
                    this.pathFrom = 0;
                    this.pathTo = distance;
                }
            }
        }
    }, {
        key: '_apply',
        value: function _apply(time) {
            _recursiveApplyTween(this._to, this._from, this.target, time, this.elapsedTime, this.easing);

            if (this.path) {
                var _time = this.pingPong ? this._time / 2 : this._time;
                var b = this.pathFrom;
                var c = this.pathTo - this.pathFrom;
                var d = _time;
                var t = this.elapsedTime / d;

                var distance = b + c * this.easing(t);
                var pos = this.path.getPointAtDistance(distance);

                this.target.position.set(pos.x, pos.y);
            }
        }
    }, {
        key: '_canUpdate',
        value: function _canUpdate() {
            return this._time && this.active && this.target;
        }
    }, {
        key: 'time',
        get: function get$$1() {
            return this._time;
        },
        set: function set$$1(value) {
            // eslint-disable-line require-jsdoc
            this._time = value || 1;
        }
    }]);
    return Tween;
}(PIXI.utils.EventEmitter);

function _recursiveApplyTween(to, from, target, time, elapsed, easing) {
    for (var k in to) {
        if (!_isObject(to[k])) {
            var b = from[k];
            var c = to[k] - from[k];
            var d = time;
            var t = elapsed / d;

            target[k] = b + c * easing(t);
        } else {
            _recursiveApplyTween(to[k], from[k], target[k], time, elapsed, easing);
        }
    }
}

function _parseRecursiveData(to, from, target) {
    for (var k in to) {
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

var TweenManager = function () {
    function TweenManager() {
        classCallCheck(this, TweenManager);

        this.tweens = [];
        this._tweensToDelete = [];

        this._last = 0;
    }

    createClass(TweenManager, [{
        key: 'update',
        value: function update(deltaMS) {
            if (!deltaMS && deltaMS !== 0) {
                deltaMS = this._getDeltaMS();
            }

            var delta = deltaMS / 1000;

            for (var i = 0; i < this.tweens.length; ++i) {
                var tween = this.tweens[i];

                if (tween.active) {
                    tween.update(delta, deltaMS);
                    if (tween.isEnded && tween.expire) {
                        tween.remove();
                    }
                }
            }

            if (this._tweensToDelete.length) {
                for (var _i = 0; _i < this._tweensToDelete.length; ++_i) {
                    this._remove(this._tweensToDelete[_i]);
                }
                this._tweensToDelete.length = 0;
            }
        }
    }, {
        key: 'getTweensForTarget',
        value: function getTweensForTarget(target) {
            var tweens = [];

            for (var i = 0; i < this.tweens.length; ++i) {
                if (this.tweens[i].target === target) {
                    tweens.push(this.tweens[i]);
                }
            }

            return tweens;
        }
    }, {
        key: 'createTween',
        value: function createTween(target) {
            return new Tween(target, this);
        }
    }, {
        key: 'addTween',
        value: function addTween(tween) {
            tween.manager = this;
            this.tweens.push(tween);
        }
    }, {
        key: 'removeTween',
        value: function removeTween(tween) {
            this._tweensToDelete.push(tween);
        }
    }, {
        key: '_remove',
        value: function _remove(tween) {
            var index = this.tweens.indexOf(tween);

            if (index !== -1) {
                this.tweens.splice(index, 1);
            }
        }
    }, {
        key: '_getDeltaMS',
        value: function _getDeltaMS() {
            if (this._last === 0) {
                this._last = Date.now();
            }
            var now = Date.now();
            var deltaMS = now - this._last;

            this._last = now;

            return deltaMS;
        }
    }]);
    return TweenManager;
}();

var TweenPath = function () {
    function TweenPath() {
        classCallCheck(this, TweenPath);

        this._colsed = false;
        this._tmpPoint = new PIXI.Point();
        this._tmpPoint2 = new PIXI.Point();
        this._tmpDistance = [];

        this.polygon = new PIXI.Polygon();
        this.polygon.closed = false;

        this.currentPath = null;
        this.graphicsData = [];
        this.dirty = true;
    }

    createClass(TweenPath, [{
        key: "moveTo",
        value: function moveTo(x, y) {
            PIXI.Graphics.prototype.moveTo.call(this, x, y);
            this.dirty = true;

            return this;
        }
    }, {
        key: "lineTo",
        value: function lineTo(x, y) {
            PIXI.Graphics.prototype.lineTo.call(this, x, y);
            this.dirty = true;

            return this;
        }
    }, {
        key: "bezierCurveTo",
        value: function bezierCurveTo(cpX, cpY, cpX2, cpY2, toX, toY) {
            PIXI.Graphics.prototype.bezierCurveTo.call(this, cpX, cpY, cpX2, cpY2, toX, toY);
            this.dirty = true;

            return this;
        }
    }, {
        key: "quadraticCurveTo",
        value: function quadraticCurveTo(cpX, cpY, toX, toY) {
            PIXI.Graphics.prototype.quadraticCurveTo.call(this, cpX, cpY, toX, toY);
            this.dirty = true;

            return this;
        }
    }, {
        key: "arcTo",
        value: function arcTo(x1, y1, x2, y2, radius) {
            PIXI.Graphics.prototype.arcTo.call(this, x1, y1, x2, y2, radius);
            this.dirty = true;

            return this;
        }
    }, {
        key: "arc",
        value: function arc(cx, cy, radius, startAngle, endAngle, anticlockwise) {
            PIXI.Graphics.prototype.arc.call(this, cx, cy, radius, startAngle, endAngle, anticlockwise);
            this.dirty = true;

            return this;
        }
    }, {
        key: "drawShape",
        value: function drawShape(shape) {
            PIXI.Graphics.prototype.drawShape.call(this, shape);
            this.dirty = true;

            return this;
        }
    }, {
        key: "getPoint",
        value: function getPoint(num) {
            this.parsePoints();
            var len = this.closed && num >= this.length - 1 ? 0 : num * 2;

            this._tmpPoint.set(this.polygon.points[len], this.polygon.points[len + 1]);

            return this._tmpPoint;
        }
    }, {
        key: "distanceBetween",
        value: function distanceBetween(num1, num2) {
            this.parsePoints();

            var _getPoint = this.getPoint(num1),
                p1X = _getPoint.x,
                p1Y = _getPoint.y;

            var _getPoint2 = this.getPoint(num2),
                p2X = _getPoint2.x,
                p2Y = _getPoint2.y;

            var dx = p2X - p1X;
            var dy = p2Y - p1Y;

            return Math.sqrt(dx * dx + dy * dy);
        }
    }, {
        key: "totalDistance",
        value: function totalDistance() {
            this.parsePoints();
            this._tmpDistance.length = 0;
            this._tmpDistance.push(0);

            var len = this.length;
            var distance = 0;

            for (var i = 0; i < len - 1; ++i) {
                distance += this.distanceBetween(i, i + 1);
                this._tmpDistance.push(distance);
            }

            return distance;
        }
    }, {
        key: "getPointAt",
        value: function getPointAt(num) {
            this.parsePoints();
            if (num > this.length) {
                return this.getPoint(this.length - 1);
            }

            if (num % 1 === 0) {
                return this.getPoint(num);
            }
            this._tmpPoint2.set(0, 0);
            var diff = num % 1;

            var _getPoint3 = this.getPoint(Math.ceil(num)),
                ceilX = _getPoint3.x,
                ceilY = _getPoint3.y;

            var _getPoint4 = this.getPoint(Math.floor(num)),
                floorX = _getPoint4.x,
                floorY = _getPoint4.y;

            var xx = -((floorX - ceilX) * diff);
            var yy = -((floorY - ceilY) * diff);

            this._tmpPoint2.set(floorX + xx, floorY + yy);

            return this._tmpPoint2;
        }
    }, {
        key: "getPointAtDistance",
        value: function getPointAtDistance(distance) {
            this.parsePoints();
            if (!this._tmpDistance) {
                this.totalDistance();
            }
            var len = this._tmpDistance.length;
            var n = 0;

            var totalDistance = this._tmpDistance[this._tmpDistance.length - 1];

            if (distance < 0) {
                distance = totalDistance + distance;
            } else if (distance > totalDistance) {
                distance = distance - totalDistance;
            }

            for (var i = 0; i < len; ++i) {
                if (distance >= this._tmpDistance[i]) {
                    n = i;
                }

                if (distance < this._tmpDistance[i]) break;
            }

            if (n === this.length - 1) {
                return this.getPointAt(n);
            }

            var diff1 = distance - this._tmpDistance[n];
            var diff2 = this._tmpDistance[n + 1] - this._tmpDistance[n];

            return this.getPointAt(n + diff1 / diff2);
        }
    }, {
        key: "parsePoints",
        value: function parsePoints() {
            if (!this.dirty) return this;
            this.dirty = false;
            this.polygon.points.length = 0;
            for (var i = 0; i < this.graphicsData.length; ++i) {
                var shape = this.graphicsData[i].shape;

                if (shape && shape.points) {
                    this.polygon.points = this.polygon.points.concat(shape.points);
                }
            }

            return this;
        }
    }, {
        key: "clear",
        value: function clear() {
            this.graphicsData.length = 0;
            this.currentPath = null;
            this.polygon.points.length = 0;
            this._closed = false;
            this.dirty = false;

            return this;
        }
    }, {
        key: "closed",
        get: function get$$1() {
            return this._closed;
        },
        set: function set$$1(value) {
            if (this._closed === value) {
                return;
            }
            this.polygon.closed = value;
            this._closed = value;
            this.dirty = true;
        }
    }, {
        key: "length",
        get: function get$$1() {
            return this.polygon.points.length ? this.polygon.points.length / 2 + (this._closed ? 1 : 0) : 0;
        }
    }]);
    return TweenPath;
}();

// extend pixi graphics to draw tweenPaths
PIXI.Graphics.prototype.drawPath = function drawPath(path) {
    path.parsePoints();
    this.drawShape(path.polygon);

    return this;
};

/**
 * @namespace PIXI.tween
 */
var tween = {
    TweenManager: TweenManager,
    Tween: Tween,
    Easing: Easing,
    TweenPath: TweenPath
};

if (!PIXI.tweenManager) {
    PIXI.tweenManager = new TweenManager();

    PIXI.tween = tween;
}

return tween;

})));
//# sourceMappingURL=pixi-tween.js.map
