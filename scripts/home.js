/// <reference path="tentacle.js" />
'use strict';

if (!window.HS)
    window.HS = {};

window.HS.Home = (function () {
    var TentacleManager = window.HS.TentacleManager,
        canvas = document.getElementById('background-canvas'),
        homeDiv = document.getElementById('home-page');

    return {
        fadeInFromAnotherPage: function (src) {
            var //isMobil = canvas.width < 1100,
                count = Math.floor(canvas.height * .05),
                vertical = false,
                direction = 0;

            HS.CanvasAnimation.AnimateColorIn(
                canvas.getContext('2d'),
                canvas.width,
                canvas.height,
                count, 1000, vertical, direction, '#F2F2F2', function () {
                    document.documentElement.classList.remove('home-page');
                    homeDiv.className = 'fade-out';
                    void (homeDiv.offsetHeight);
                    document.documentElement.classList.add('home-page');
                    HS.Site.resizeCanvas('#F2F2F2');
                    TentacleManager.draw();
                    homeDiv.className = 'fade-in';
                });
        },
        fadeIn: function () {
            HS.Site.hideLoading();
            document.documentElement.classList.remove('home-page');
            homeDiv.className = 'fade-out';
            void (homeDiv.offsetHeight);
            document.documentElement.classList.add('home-page');
            HS.Site.resizeCanvas();
            TentacleManager.draw();
            homeDiv.className = 'fade-in';
        },
        fadeOut: function (callback) {
            homeDiv.className = 'fade-out';
            setTimeout(function () {
                document.documentElement.classList.remove('home-page');
                callback();
            }, 500);
        },
        onresize: function () {
            HS.Home.fadeIn();
        }
    }
})();