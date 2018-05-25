// <reference path="MathH.js" />
'use strict';

if (!window.HS)
    window.HS = {};

window.HS.Contact = (function () {
    var contactDiv = document.getElementById('contact-page'), nav = document.querySelector('nav');

    document.getElementById('twitter-link').onclick = function () {
        alert('I don\'t really have a Twitter, I just wanted 4 links so they fit neatly in the page. Sorry!');
    }

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
                count, 1000, vertical, direction, '#FF5656', function () {
                    window.scrollTo(0, 0);
                    nav.style.top = '-41px';
                    document.documentElement.classList.remove('contact-page');
                    contactDiv.className = 'fade-out';
                    void (contactDiv.offsetHeight);
                    void (nav.offsetHeight);
                    document.documentElement.classList.add('contact-page');
                    contactDiv.className = 'fade-in';
                    HS.Site.resizeCanvas('#FF5656');
                    HS.Site.resizeCanvas('#FF5656');//Twice to remove the scroll bar, for some reason it doesn't go away automatically
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
            HS.Site.resizeCanvas('#FF5656');
            contactDiv.className = 'fade-in';
            nav.style.top = '0';
        },
        fadeOut: function (callback) {
            nav.style.top = '-41px';
            contactDiv.className = 'fade-out';
            setTimeout(function () {
                document.documentElement.classList.remove('contact-page');
                callback();
            }, 500);
        },
        onresize: function () {
            HS.Site.resizeCanvas('#FF5656');
        }
    }
})();