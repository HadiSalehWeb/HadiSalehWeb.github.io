/// <reference path="tentacle.js" />
'use strict';

if (!window.HadiSaleh)
    window.HadiSaleh = {};

window.HadiSaleh.Start = (function () {
    const TentacleManager = window.HadiSaleh.TentacleManager;
    const MathH = window.HadiSaleh.MathH;

    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');
    const dimensions = {
        width: 0,
        height: 0
    }

    const fadeInStartText = (function () {
        const elem = document.getElementById('start-text-animate');
        const startTop = 30, startOpacity = 0, rangeTop = -30, rangeOpactiy = 1;
        var val = 0;

        return {
            onAnimationFrame: function (pos) {
                if (pos > .5) {
                    elem.style.top = (startTop + rangeTop) + 'px';
                    elem.style.opacity = startOpacity + rangeOpactiy;
                    return;
                }
                //val = MathH.logistic(pos, { l: 2, k: 10, x0: .5 });
                val = MathH.parabola(pos, { a: 4 });
                elem.style.top = (startTop + rangeTop * val) + 'px';
                elem.style.opacity = startOpacity + rangeOpactiy * val;
            }
        }
    })()

    const initCanvas = function () {
        //dimensions.width = Math.max(window.innerWidth, document.body.clientWidth);
        //dimensions.height = Math.max(window.innerHeight, document.body.clientHeight);
        dimensions.width = document.body.clientWidth;
        dimensions.height = document.body.clientHeight;
        console.log(dimensions);
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;

        //canvas.style.height = '';
        //canvas.style.width = '';
        //if (window.innerWidth > document.body.clientWidth)
        //    if (window.innerHeight > window.innerWidth)
        //        canvas.style.height = '100%';
        //    else
        //        canvas.style.width = '100%';

        ctx.scale(1, -1);
        ctx.translate(0, -canvas.height);
        TentacleManager.init(dimensions.width, dimensions.height);
        TentacleManager.draw(
            Math.floor((dimensions.width + dimensions.height) * 0.05), 1000, ctx, fadeInStartText.onAnimationFrame);
    }

    const init = function () {
        initCanvas();
    }

    window.onresize = function () {
        init();
    }

    init();

})();