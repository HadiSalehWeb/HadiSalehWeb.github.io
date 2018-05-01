// <reference path="" />
'use strict';

if (!window.HS)
    window.HS = {};

window.HS.Skills = (function () {
    var skillsDiv = document.getElementById('skills-page'), nav = document.querySelector('nav');

    //var skills = {
    //    'Javascript': 10,
    //    'C#': 10,
    //    'HTML/CSS': 9,
    //    'GLSL': 9,
    //    'ASP.NET/MVC': 9,
    //    'Unity': 7,
    //    'Shaderlab': 7,
    //    'MS Sql Server': 4,
    //    'C': 4,
    //    'Java': 4,
    //    'C++': 3,
    //    'Python': 2
    //}

    return {
        fadeInFromAnotherPage: function (src) {
            var canvas = document.getElementById('background-canvas');
            var isMobil = window.innerWidth < 1100,
                count = Math.floor((isMobil ? canvas.height : canvas.width) * .005),
                vertical = false,
                direction = isMobil ? 0 : 1;

            HS.CanvasAnimation.AnimateColorIn(
                canvas.getContext('2d'),
                canvas.width,
                canvas.height,
                count, 1000, vertical, direction, '#FFF056', function () {
                    window.scrollTo(0, 0);
                    nav.style.top = '-41px';
                    document.documentElement.classList.remove('skills-page');
                    skillsDiv.className = 'fade-out';
                    void (skillsDiv.offsetHeight);
                    void (nav.offsetHeight);
                    document.documentElement.classList.add('skills-page');
                    HS.Site.resizeCanvas('#FFF056');
                    skillsDiv.className = 'fade-in';
                    nav.style.top = '0';
                });
        },
        fadeIn: function () {
            HS.Site.hideLoading();
            nav.style.top = '-41px';
            document.documentElement.classList.remove('skills-page');
            skillsDiv.className = 'fade-out';
            void (skillsDiv.offsetHeight);
            void (nav.offsetHeight);
            document.documentElement.classList.add('skills-page');
            HS.Site.resizeCanvas('#FFF056');
            skillsDiv.className = 'fade-in';
            console.log('in');
            nav.style.top = '0';
        },
        fadeOut: function () {
            nav.style.top = '-41px';
            skillsDiv.className = 'fade-out';
            setTimeout(function () {
                document.documentElement.classList.remove('skills-page');
            }, 500);
        },
        onresize: function () {
            HS.Site.resizeCanvas('#FFF056');
        }
    }
})();