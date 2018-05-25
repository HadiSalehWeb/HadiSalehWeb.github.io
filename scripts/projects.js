// <reference path="MathH.js" />
'use strict';

if (!window.HS)
    window.HS = {};

window.HS.Projects = (function () {
    var projDiv = document.getElementById('projects-page'), nav = document.querySelector('nav');

    return {
        fadeInFromAnotherPage: function (src) {
            var canvas = document.getElementById('background-canvas');
            var isMobil = window.innerWidth < 1100,
                count = Math.floor((isMobil ? canvas.height : canvas.width) * .005),
                vertical = false,
                direction = isMobil ? 0 : -1;

            HS.CanvasAnimation.AnimateColorIn(
                canvas.getContext('2d'),
                canvas.width,
                canvas.height,
                count, 1000, vertical, direction, '#FFF', function () {
                    window.scrollTo(0, 0);
                    nav.style.top = '-41px';
                    document.documentElement.classList.remove('projects-page');
                    projDiv.className = 'fade-out';
                    void (projDiv.offsetHeight);
                    void (nav.offsetHeight);
                    document.documentElement.classList.add('projects-page');
                    HS.Site.resizeCanvas('#FFF');
                    projDiv.className = 'fade-in';
                    nav.style.top = '0';
                });
        },
        fadeIn: function () {
            HS.Site.hideLoading();
            nav.style.top = '-41px';
            document.documentElement.classList.remove('projects-page');
            projDiv.className = 'fade-out';
            void (projDiv.offsetHeight);
            void (nav.projDiv);
            document.documentElement.classList.add('projects-page');
            HS.Site.resizeCanvas('#FFF');
            projDiv.className = 'fade-in';
            console.log('in');
            nav.style.top = '0';
        },
        fadeOut: function (callback) {
            nav.style.top = '-41px';
            projDiv.className = 'fade-out';
            setTimeout(function () {
                document.documentElement.classList.remove('projects-page');
                callback();
            }, 500);
        },
        onresize: function () {
            HS.Site.resizeCanvas('#FFF');
        }
    }
})();