// <reference path="MathH.js" />
'use strict';

if (!window.HS)
    window.HS = {};

window.HS.Experiments = (function () {
    var expDiv = document.getElementById('experiments-page'), nav = document.querySelector('nav');

    var slideExperimentsOut = function (callback) {
        expDiv.classList.add('animating');
        var exp = expDiv.children[0].children;

        for (var expI = 0; expI < exp.length; expI++)
            for (var contentI = 0; contentI < 4; contentI++) {
                exp[expI].children[contentI].setAttribute('style', '');
            }

        setTimeout(function () {
            expDiv.classList.remove('animating');
            if (typeof callback === 'function') callback();
        }, 500);
    }

    var slideExperimentsIn = function (callback) {
        expDiv.classList.add('animating');
        var exp = expDiv.children[0].children;

        var step = function (expI, contentI) {
            exp[expI].children[contentI].setAttribute('style', 'left:0');
            if (contentI === 0) {
                contentI++;
                exp[expI].children[contentI].setAttribute('style', 'left:0');
            }
            if (expI === exp.length - 1 && contentI === 3) {
                setTimeout(function () {
                    expDiv.classList.remove('animating');
                    if (typeof callback === 'function') callback();
                }, 500);
                return;
            }

            expI = contentI >= 3 ? expI + 1 : expI;
            contentI = contentI >= 3 ? 0 : contentI + 1;

            setTimeout(step, 50, expI, contentI);
        }

        setTimeout(step, 50, 0, 0);
    }

    return {
        fadeInFromAnotherPage: function (src) {
            var canvas = document.getElementById('background-canvas');
            var isMobil = window.innerWidth < 1100,
                count = Math.floor((isMobil ? canvas.height : canvas.width) * .005),
                vertical = isMobil ? false : true,
                direction = isMobil ? 0 : -1;

            HS.CanvasAnimation.AnimateColorIn(
                canvas.getContext('2d'),
                canvas.width,
                canvas.height,
                count, 1000, vertical, direction, '#1E1E1E', function () {
                    window.scrollTo(0, 0);
                    nav.style.top = '-41px';
                    document.documentElement.classList.add('experiments-page');
                    HS.Site.resizeCanvas('#1E1E1E');
                    slideExperimentsIn();
                    void (nav.offsetHeight);
                    nav.style.top = '0';
                });
        },
        fadeIn: function () {//TODO: Do this on the other FadeIn too
            HS.Site.showLoading();
            var images = document.querySelectorAll('#experiments-page [data-experiment] img');

            function fadeIn() {
                for (var i = 0; i < images.length; i++)
                    if (!images[i].complete) {
                        setTimeout(fadeIn, 100);
                        return;
                    }

                document.documentElement.classList.add('experiments-page');
                HS.Site.resizeCanvas('#1E1E1E');
                slideExperimentsIn();
                HS.Site.hideLoading();
            }
            fadeIn();
        },
        fadeOut: function () {
            nav.style.top = '-41px';
            slideExperimentsOut(function () {
                document.documentElement.classList.remove('experiments-page');
            });
        },
        onresize: function () {
            HS.Site.resizeCanvas('#1E1E1E');
        }
    }
})();