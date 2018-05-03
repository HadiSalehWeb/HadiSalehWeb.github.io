// <reference path="MathH.js" />
'use strict';

if (!window.HS)
    window.HS = {};

window.HS.Contact = (function () {
    var contactDiv = document.getElementById('contact-page'), nav = document.querySelector('nav');

    return {
        fadeInFromAnotherPage: function (src) {
            var canvas = document.getElementById('background-canvas');
            var isMobil = window.innerWidth < 1100,
                count = Math.floor((isMobil ? canvas.height : canvas.width) * .005),
                vertical = isMobil ? false : true,
                direction = isMobil ? 0 : 1;

            HS.CanvasAnimation.AnimateColorIn(
                canvas.getContext('2d'),
                canvas.width,
                canvas.height,
                count, 1000, vertical, direction, '#FFF056', function () {
                    window.scrollTo(0, 0);
                    nav.style.top = '-41px';
                    document.documentElement.classList.remove('contact-page');
                    contactDiv.className = 'fade-out';
                    void (contactDiv.offsetHeight);
                    void (nav.offsetHeight);
                    document.documentElement.classList.add('contact-page');
                    HS.Site.resizeCanvas('#FFF056');
                    contactDiv.className = 'fade-in';
                    nav.style.top = '0';
                });
        },
        fadeIn: function () {
            HS.Site.hideLoading();
            nav.style.top = '-41px';
            document.documentElement.classList.remove('contact-page');
            contactDiv.className = 'fade-out';
            void (contactDiv.offsetHeight);
            void (nav.contactDiv);
            document.documentElement.classList.add('contact-page');
            HS.Site.resizeCanvas('#FFF056');
            contactDiv.className = 'fade-in';
            console.log('in');
            nav.style.top = '0';
        },
        fadeOut: function () {
            nav.style.top = '-41px';
            contactDiv.className = 'fade-out';
            setTimeout(function () {
                document.documentElement.classList.remove('contact-page');
            }, 500);
        },
        onresize: function () {
            HS.Site.resizeCanvas('#FFF056');
        }
    }
})();