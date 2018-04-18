/// <reference path="MathH.js" />
'use strict';

if (!window.HS)
    window.HS = {};

window.HS.CanvasAnimation = (function () {
    var MathH = HS.MathH;

    var Rectangle = (function () {
        var lastPerm = 0;

        return function (width, height, rectLen, i, vertical, direction, animationIndex) {
            this.animationIndex = animationIndex;
            var dw = 0, dh = 0;

            if (vertical) {
                this.x = i * rectLen;
                this.w = rectLen;
                this.h = 0;
                dw = 0;

                if (direction === 1) {
                    this.y = 0;
                    dh = 1;
                } else if (direction === -1) {
                    this.y = height;
                    dh = -1;
                } else {
                    this.y = height * lastPerm;
                    dh = 1 - 2 * lastPerm;
                    lastPerm = 1 - lastPerm;
                }
            } else {
                this.y = i * rectLen;
                this.w = 0;
                this.h = rectLen;
                dh = 0;

                if (direction === 1) {
                    this.x = 0;
                    dw = 1;
                } else if (direction === -1) {
                    this.x = width;
                    dw = -1;
                } else {
                    this.x = width * lastPerm;
                    dw = 1 - 2 * lastPerm;
                    lastPerm = 1 - lastPerm;
                }
            }

            this.setProgression = function (val) {
                if (vertical)
                    this.h = val * height * dh;
                else this.w = val * width * dw;
                return this;
            }
            this.draw = function (ctx, color) {
                ctx.fillRect(this.x, this.y, this.w, this.h);
                return this;
            }
        }
    })();

    //var iterateGarbage = (function (totalTime) {
    //    var canvas = document.getElementById('background-canvas');
    //    var ctx = canvas.getContext('2d');
    //    var width, height, count, vertical, direction, color;

    //    return function (c) {
    //        width = canvas.width;
    //        height = canvas.height;
    //        count = Math.floor(Math.random() * 200);
    //        vertical = Math.random() < .5;
    //        direction = Math.floor(Math.random() * 3) - 1;
    //        color = 'rgb(' +
    //            Math.floor(Math.random() * 256) + ', ' +
    //            Math.floor(Math.random() * 256) + ', ' +
    //            Math.floor(Math.random() * 256) + ')';

    //        HS.CanvasAnimation.AnimateColorIn(
    //            ctx, width, height, count, totalTime, vertical, direction, color,
    //            c === 1 ? undefined : function () {
    //                iterateGarbage(c - 1);
    //            });
    //    }
    //})(500);


    return {
        AnimateColorIn: function (ctx, width, height, rectCount, totalTime, vertical, direction, color, onfinished) {
            var rectLen = vertical ? width / rectCount : height / rectCount;
            var relevantDimension = vertical ? height : width;
            var rects = [];
            var indexesTemp = Array.apply(null, Array(rectCount)).map(function (x, i) { return i; });

            for (var i = 0; i < rectCount; i++)
                rects.push(new Rectangle(
                    width, height, rectLen, i, vertical, direction,
                    indexesTemp.splice(Math.floor(Math.random() * indexesTemp.length), 1)[0]
                ));

            var start = null, curr = 0;

            var step = function (timestamp) {
                if (!start) start = timestamp;
                if (timestamp - start >= totalTime) {
                    ctx.fillStyle = color;
                    ctx.fillRect(0, 0, width, height);
                    if (typeof onfinished === 'function')
                        onfinished();
                    return;
                }

                curr = (timestamp - start) / totalTime;

                ctx.fillStyle = color;

                for (var i = 0, len = rects.length; i < len; i++)
                    rects[i]
                        .setProgression(MathH.logisticArray(curr * 2, rects[i].animationIndex, len))
                        .draw(ctx);

                requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        }
    }
})();

var IterateAnimations = (function (totalTime) {
    var canvas = document.getElementById('background-canvas');
    var ctx = canvas.getContext('2d');
    var width, height, count, vertical, direction, color;

    return function (c) {
        width = canvas.width;
        height = canvas.height;
        count = Math.floor(Math.random() * 200);
        vertical = Math.random() < .5;
        direction = Math.floor(Math.random() * 3) - 1;
        color = 'rgb(' +
            Math.floor(Math.random() * 256) + ', ' +
            Math.floor(Math.random() * 256) + ', ' +
            Math.floor(Math.random() * 256) + ')';

        HS.CanvasAnimation.AnimateColorIn(
            ctx, width, height, count, totalTime, vertical, direction, color,
            c === 1 ? undefined : function () {
                IterateAnimations(c - 1);
            });
    }
})(500);