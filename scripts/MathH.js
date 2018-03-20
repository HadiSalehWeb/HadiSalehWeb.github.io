'use strict';

if (!window.HadiSaleh)
    window.HadiSaleh = {};

window.HadiSaleh.MathH = (function () {
    const TWO_PI = Math.PI * 2, PI = Math.PI;

    const randomBetween = function (a, b) {
        return a + Math.random() * (b - a);
    }

    function RandomRange(a, b) {
        this.a = a;
        this.b = b;
    }
    RandomRange.prototype.value = function () {
        return randomBetween(this.a, this.b);
    }

    function RandomAroundPoint(p, r) {
        this.a = p - r;
        this.b = p + r;
    }
    RandomAroundPoint.prototype = RandomRange.prototype;

    function logistic(x, options) {
        let l = 1, k = 10, x0 = .5;
        if (options) {
            l = options.l || 1;
            k = options.k || 10;
            x0 = options.x0 || .5;
        }
        return l / (1 + Math.exp(-k * (x - x0)));
    }

    function parabola(x, options) {
        let a = 1;
        if (options) {
            a = options.a || 1;
        }
        return a * x * x;
    }

    function logisticArray(x, index, len) {
        // Note: range is now [0, 2], not [0, 1].
        return logistic(x, { x0: .5 + index / (len - 1) });
        return 1 / (1 + Math.exp(-10 * (x - .5 - index / (len - 1))));
    }

    function restrictAngle(a) {
        /// <summary>Normalizes an angle to [-pi, pi]</summary>
        a = ((a % TWO_PI) + TWO_PI) % TWO_PI;//the smallest positive remainder of the angle
        return a > PI ? a - TWO_PI : a;
    }

    function angleFromTo(x1, y1, x2, y2) {
        return Math.atan2(y2 - y1, x2 - x1);
    }

    return {
        TWO_PI: Math.PI * 2,
        PI: Math.PI,
        randomBetween: randomBetween,
        RandomRange: RandomRange,
        RandomAroundPoint: RandomAroundPoint,
        logistic: logistic,
        logisticArray: logisticArray,
        restrictAngle: restrictAngle,
        angleFromTo: angleFromTo,
        parabola: parabola
    }
})();