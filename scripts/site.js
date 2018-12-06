// <reference path="" />
///TODO: If menu open and HS clicked, collapse menu first
///TODO: Handle interrupting the animations
'use strict';

if (!window.HS)
    window.HS = {};

window.HS.Site = (function () {
    var currentTabName, canvas = document.getElementById('background-canvas'), ctx = canvas.getContext('2d');
    var loadingDiv = document.getElementById('loading');
    var nav = document.querySelector('nav');
    var lastWidth = document.body.clientWidth, lastHeight = document.body.clientHeight;

    //resize handling
    var doit = null;
    window.onresize = function (ev) {
        doit = setTimeout(function () {
            HS.States[currentTabName].onresize(lastWidth - document.body.clientWidth, lastHeight - document.body.clientHeight);
            lastWidth = document.body.clientWidth;
            lastHeight = document.body.clientHeight;
        }, 50);
    }

    //Navigation hamburger
    document.getElementById('nav-toggle').onclick = function () {
        nav.className = nav.className === 'active' ? '' : 'active';
    }

    var transitionTo = function (name) {
        //var tab = HS.States[name];
        if (currentTabName === name) return;
        // history.pushState({ tabName: name }, "Hadi Saleh", name);
        nav.className = '';
        HS.States[currentTabName].fadeOut(function () {
            HS.States[name].fadeInFromAnotherPage(currentTabName);
            currentTabName = name;
        });
    }

    var links = document.getElementById('links');
    var navUl = document.querySelector('nav ul');

    document.getElementById('main-icon').onclick = function () {
        transitionTo('index.html');
    }

    links.children[0].onclick =
        navUl.children[0].onclick = function () {
            transitionTo('experiments.html');
        }
    links.children[2].onclick =
        navUl.children[2].onclick = function () {
            transitionTo('skills.html');
        }
    links.children[1].onclick =
        navUl.children[1].onclick = function () {
            transitionTo('projects.html');
        }
    links.children[3].onclick =
        navUl.children[3].onclick = function () {
            transitionTo('contact.html');
        }

    var colorLoader = function (color, bg) {
        loadingDiv.children[0].innerHTML = //A style element
            '.loader { color: ' + color + ' }' +
            '.loader:before, .loader:after { background-color: ' + bg + ' }';
    }

    window.onpopstate = function (e) {
        transitionTo(e.state.tabName);
    }

    return {
        init: function (name) {
            history.replaceState({ tabName: name }, 'Hadi Saleh');
            //currentTab = HS.States[name];
            currentTabName = name;
            HS.States[currentTabName].fadeIn();
        },
        resizeCanvas: function (fillColor) {
            canvas.height = Math.max(document.body.clientHeight, window.innerHeight);
            canvas.width = document.body.clientWidth;
            ctx.scale(1, -1);
            ctx.translate(0, -canvas.height);

            if (fillColor) {
                ctx.fillStyle = fillColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        },
        showLoading: function (color, bg) {
            loadingDiv.style.display = 'block';
            colorLoader(color || '#000', bg || '#fff');

        },
        hideLoading: function () {
            loadingDiv.style.display = 'none';
        }
    }
})();

/*

// <reference path="" />
'use strict';

if (!window.HS)
    window.HS = {};

window.HS.XXX = (function () {
    
    return {
        
    }
})();

*/