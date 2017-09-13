const Easing = {
    linear() {
        return function(t) {
            return t;
        };
    },

    inQuad() {
        return function(t) {
            return t * t;
        };
    },

    outQuad() {
        return function(t) {
            return t * (2 - t);
        };
    },

    inOutQuad() {
        return function(t) {
            t *= 2;
            if (t < 1) return 0.5 * t * t;

            return -0.5 * (--t * (t - 2) - 1);
        };
    },

    inCubic() {
        return function(t) {
            return t * t * t;
        };
    },

    outCubic() {
        return function(t) {
            return --t * t * t + 1;
        };
    },

    inOutCubic() {
        return function(t) {
            t *= 2;
            if (t < 1) return 0.5 * t * t * t;
            t -= 2;

            return 0.5 * (t * t * t + 2);
        };
    },

    inQuart() {
        return function(t) {
            return t * t * t * t;
        };
    },

    outQuart() {
        return function(t) {
            return 1 - (--t * t * t * t);
        };
    },

    inOutQuart() {
        return function(t) {
            t *= 2;
            if (t < 1) return 0.5 * t * t * t * t;
            t -= 2;

            return -0.5 * (t * t * t * t - 2);
        };
    },

    inQuint() {
        return function(t) {
            return t * t * t * t * t;
        };
    },

    outQuint() {
        return function(t) {
            return --t * t * t * t * t + 1;
        };
    },

    inOutQuint() {
        return function(t) {
            t *= 2;
            if (t < 1) return 0.5 * t * t * t * t * t;
            t -= 2;

            return 0.5 * (t * t * t * t * t + 2);
        };
    },

    inSine() {
        return function(t) {
            return 1 - Math.cos(t * Math.PI / 2);
        };
    },

    outSine() {
        return function(t) {
            return Math.sin(t * Math.PI / 2);
        };
    },

    inOutSine() {
        return function(t) {
            return 0.5 * (1 - Math.cos(Math.PI * t));
        };
    },

    inExpo() {
        return function(t) {
            return t === 0 ? 0 : Math.pow(1024, t - 1);
        };
    },

    outExpo() {
        return function(t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        };
    },

    inOutExpo() {
        return function(t) {
            if (t === 0) return 0;
            if (t === 1) return 1;
            t *= 2;
            if (t < 1) return 0.5 * Math.pow(1024, t - 1);

            return 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
        };
    },

    inCirc() {
        return function(t) {
            return 1 - Math.sqrt(1 - t * t);
        };
    },

    outCirc() {
        return function(t) {
            return Math.sqrt(1 - (--t * t));
        };
    },

    inOutCirc() {
        return function(t) {
            t *= 2;
            if (t < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1);

            return 0.5 * (Math.sqrt(1 - (t - 2) * (t - 2)) + 1);
        };
    },

    inElastic(a = 0.1, p = 0.4) {
        return function(t) {
            let s;

            if (t === 0) return 0;
            if (t === 1) return 1;
            if (!a || a < 1) { a = 1; s = p / 4; } else s = p * Math.asin(1 / a) / (2 * Math.PI);

            return -(a * Math.pow(2, 10 * (t - 1)) * Math.sin(((t - 1) - s) * (2 * Math.PI) / p));
        };
    },

    outElastic(a = 0.1, p = 0.4) {
        return function(t) {
            let s;

            if (t === 0) return 0;
            if (t === 1) return 1;
            if (!a || a < 1) { a = 1; s = p / 4; } else s = p * Math.asin(1 / a) / (2 * Math.PI);

            return (a * Math.pow(2, -10 * t) * Math.sin((t - s) * (2 * Math.PI) / p) + 1);
        };
    },

    inOutElastic(a = 0.1, p = 0.4) {
        return function(t) {
            let s;

            if (t === 0) return 0;
            if (t === 1) return 1;
            if (!a || a < 1) { a = 1; s = p / 4; } else s = p * Math.asin(1 / a) / (2 * Math.PI);
            t *= 2;
            if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t - 1)) * Math.sin(((t - 1) - s) * (2 * Math.PI) / p));

            return a * Math.pow(2, -10 * (t - 1)) * Math.sin(((t - 1) - s) * (2 * Math.PI) / p) * 0.5 + 1;
        };
    },

    inBack(v) {
        return function(t) {
            const s = v || 1.70158;

            return t * t * ((s + 1) * t - s);
        };
    },

    outBack(v) {
        return function(t) {
            const s = v || 1.70158;

            return --t * t * ((s + 1) * t + s) + 1;
        };
    },

    inOutBack(v) {
        return function(t) {
            const s =    (v || 1.70158) * 1.525;

            t *= 2;
            if (t < 1) return 0.5 * (t * t * ((s + 1) * t - s));

            return 0.5 * ((t - 2) * (t - 2) * ((s + 1) * (t - 2) + s) + 2);
        };
    },

    inBounce() {
        return function(t) {
            return 1 - Easing.outBounce()(1 - t);
        };
    },

    outBounce() {
        return function(t) {
            if (t < (1 / 2.75)) {
                return 7.5625 * t * t;
            } else if (t < (2 / 2.75)) {
                t = (t - (1.5 / 2.75));

                return 7.5625 * t * t + 0.75;
            } else if (t < (2.5 / 2.75)) {
                t = (t - (2.25 / 2.75));

                return 7.5625 * t * t + 0.9375;
            }
            t -= (2.625 / 2.75);

            return 7.5625 * t * t + 0.984375;
        };
    },

    inOutBounce() {
        return function(t) {
            if (t < 0.5) return Easing.inBounce()(t * 2) * 0.5;

            return Easing.outBounce()(t * 2 - 1) * 0.5 + 0.5;
        };
    },

    customArray(arr) {
        if (!arr) return Easing.linear();

        return function(t) {
            // todo: convert array => ease
            return t;
        };
    },
};

export default Easing;
