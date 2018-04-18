// <reference path="" />
///TODO: If menu open and HS clicked, collapse menu first
///TODO: Handle interrupting the animations
'use strict';

if (!window.HS)
    window.HS = {};

window.HS.Site = (function () {
    var currentTabName, canvas = document.getElementById('background-canvas'), ctx = canvas.getContext('2d');
    var loadingDiv = document.getElementById('loading');

    //resize handling
    var doit = null;
    window.onresize = function () {
        doit = setTimeout(HS.States[currentTabName].onresize, 50);
    }

    //Navigation hamburger
    document.getElementById('nav-toggle').onclick = function () {
        var nav = document.querySelector('nav');
        nav.className = nav.className === 'active' ? '' : 'active';
    }

    var transitionTo = function (name) {
        //var tab = HS.States[name];
        if (currentTabName === name) return;
        HS.States[currentTabName].fadeOut();
        history.pushState({ tabName: name }, "Hadi Saleh", name);
        HS.States[name].fadeInFromAnotherPage(currentTabName);
        currentTabName = name;
    }

    document.getElementById('main-icon').onclick = function () {
        transitionTo('index.html');
    }

    document.getElementById('links').children[0].onclick = function () {
        transitionTo('experiments.html');
    }
    document.getElementById('links').children[2].onclick = function () {
        transitionTo('skills.html');
    }

    var colorLoader = function (color, bg) {
        loadingDiv.children[0].innerHTML = //A style element
            '.loader {color: ' + color + '}' +
            '.loader:before, .loader:after{background - color: ' + bg + ' }';
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
            canvas.width = document.body.clientWidth;
            canvas.height = document.body.clientHeight;
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