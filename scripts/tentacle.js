/// <reference path="MathH.js" />
'use strict';

if (!window.HS)
    window.HS = {};

window.HS.TentacleManager = (function (settings) {
    var MathH = window.HS.MathH,
        canvas = document.getElementById('background-canvas'),
        ctx = canvas.getContext('2d');

    function distributeRandom(length, index, count) {
        var segmentLength = length / count;
        return MathH.randomBetween(index * segmentLength, (index + 1) * segmentLength);
    }

    function nextControlWidth(maxWidth, index, segCount) {
        var i = segCount - index - 1;
        if (i == 0) return 0;
        return distributeRandom(maxWidth, i, segCount);
    }

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.push = function (a, l) {
        //'Pushes' the point at angle (a) for a length of (l)
        return new Point(this.x + l * Math.cos(a), this.y + l * Math.sin(a));
    }
    Point.middle = function (p1, p2) {
        return new Point((p1.x + p2.x) * .5, (p1.y + p2.y) * .5);
    }

    function Segment(options) {
        /// <summary>Options: currentLength, endLength, currentAngle, endAngle, width.</summary>
        var startLength = options.currentLength || 0;
        var endLength = options.endLength || 1;
        var startAngle = options.currentAngle || 0;
        var endAngle = options.endAngle || 0;

        this.currentLength = startLength;
        this.currentAngle = startAngle;
        this.width = options.width || 0;

        this.animate = function (val) {
            this.currentAngle = startAngle + val * (endAngle - startAngle);
            this.currentLength = startLength + val * (endLength - startLength);
        }
    }

    function Tentacle(options) {
        /// <summary>Options: root, segCount, color, rootAngle.</summary>
        this.root = options.root || new Point(0, 0);
        this.segCount = options.segCount || 4;
        this.color = options.color || 'black';
        this.segments = [];
        var rootAngle = options.rootAngle || 0;
        var maxControlWidth = settings.maxControlWidth.value();

        for (var i = 0; i < this.segCount; i++) {
            this.segments.push(new Segment({
                width: nextControlWidth(maxControlWidth, i, this.segCount),
                currentLength: 0,
                endLength: settings.segmentLengthRange.value(),
                currentAngle: i == 0 ? rootAngle : settings.segmentDiversionRange.value(),
                endAngle: i == 0 ? rootAngle : settings.segmentDiversionRange.value()
            }));
        }

        this.animate = function (val) {
            for (var i = 0; i < this.segments.length; i++)
                this.segments[i].animate(MathH.logisticArray(val, i, this.segments.length));
        }
    }

    function clearCanvas() {
        ctx.fillStyle = settings.backgroundColor;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    function curveThroughPoints(points, color) {
        var headIndex = Math.floor(points.length * .5);
        var first = Point.middle(points[0], points[1]);
        var p;

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(first.x, first.y);

        for (var i = 1; i < headIndex - 1; i++) {
            p = Point.middle(points[i], points[i + 1]);
            ctx.quadraticCurveTo(points[i].x, points[i].y, p.x, p.y);
        }

        ctx.quadraticCurveTo(points[headIndex - 1].x, points[headIndex - 1].y,
            points[headIndex].x, points[headIndex].y);

        for (var i = headIndex + 1; i < points.length - 1; i++) {
            p = Point.middle(points[i], points[i + 1]);
            ctx.quadraticCurveTo(points[i].x, points[i].y, p.x, p.y);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);

        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }

    function pointsFromTentacle(tentacle) {
        var inner = [], outer = [];
        var currentPos = tentacle.root,
            currentAngle = MathH.restrictAngle(tentacle.segments[0].currentAngle),
            controlPushAngle = 0;

        inner.push(currentPos.push(currentAngle + Math.PI * .5, tentacle.segments[0].width));
        currentPos = currentPos.push(currentAngle, tentacle.segments[0].currentLength);

        for (var i = 1; i < tentacle.segments.length; i++) {
            controlPushAngle = currentAngle + (MathH.restrictAngle(tentacle.segments[i].currentAngle) + Math.PI) * .5;
            inner.push(currentPos.push(
                controlPushAngle,
                tentacle.segments[i].width));
            currentAngle = currentAngle + tentacle.segments[i].currentAngle;
            currentPos = currentPos.push(currentAngle, tentacle.segments[i].currentLength);
        }

        currentPos = tentacle.root;
        currentAngle = tentacle.segments[0].currentAngle;
        outer.push(currentPos.push(currentAngle - Math.PI * .5, tentacle.segments[0].width));
        currentPos = currentPos.push(currentAngle, tentacle.segments[0].currentLength);

        for (var i = 1; i < tentacle.segments.length; i++) {
            controlPushAngle = currentAngle + (MathH.restrictAngle(tentacle.segments[i].currentAngle) - Math.PI) * .5;
            outer.push(currentPos.push(
                controlPushAngle,
                tentacle.segments[i].width));
            currentAngle = currentAngle + tentacle.segments[i].currentAngle;
            currentPos = currentPos.push(currentAngle, tentacle.segments[i].currentLength);
        }

        outer.reverse();

        return inner.concat(currentPos).concat(outer);
    }

    return {
        draw: function () {
            var canvasWidth = canvas.width,
                canvasHeight = canvas.height,
                count = Math.floor((canvasWidth + canvasHeight) * 0.05),
                totalTime = 1000,
                countTopLeft = Math.floor(count * .5),
                countBottomRight = count - countTopLeft,
                factor = canvasWidth / (canvasWidth + canvasHeight),
                countTop = Math.floor(countTopLeft * factor),
                countLeft = countTopLeft - countTop,
                countBottom = Math.floor(countBottomRight * factor),
                countRight = countBottomRight - countBottom,
                tentacles = [],
                center = new Point(canvasWidth * .5, canvasHeight * .5);
            var makeCoordFunction = function (constant, variable) {
                if (variable !== undefined)
                    return function (i) {
                        return distributeRandom(constant, i, variable);
                    }

                return function (i) {
                    return constant;
                }
            }
            var c, x, y, root;

            //Construct the Tentacles
            for (var s = 0; s < 4; s++) {//all four sides of the screen, from the right side counterclockwise
                c = s == 0 ? countRight :
                    s == 1 ? countTop :
                        s == 2 ? countLeft :
                            countBottom;
                x = s == 0 ? makeCoordFunction(canvasWidth + 10) :
                    s == 1 ? makeCoordFunction(canvasWidth, c) :
                        s == 2 ? makeCoordFunction(-10) :
                            makeCoordFunction(canvasWidth, c);
                y = s == 0 ? makeCoordFunction(canvasHeight, c) :
                    s == 1 ? makeCoordFunction(canvasHeight + 10) :
                        s == 2 ? makeCoordFunction(canvasHeight, c) :
                            makeCoordFunction(-10);

                for (var i = 0; i < c; i++) {
                    root = new Point(x(i), y(i));
                    tentacles.push(new Tentacle({
                        root: root,
                        segCount: Math.floor(settings.segmentCountRange.value()),
                        color: settings.colors[Math.floor(MathH.randomBetween(0, settings.colors.length))],
                        rootAngle: MathH.angleFromTo(root.x, root.y, center.x, center.y)
                    }));
                }
            }

            var start = null, val = 0;

            var step = function (timestamp) {
                if (!start) start = timestamp;
                if (timestamp - start > totalTime) {
                    return;
                }

                val = 2 * (timestamp - start) / totalTime;

                clearCanvas();
                for (var i = 0; i < tentacles.length; i++) {
                    tentacles[i].animate(val);
                    curveThroughPoints(pointsFromTentacle(tentacles[i]), tentacles[i].color);
                }

                requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        }
    }
})({
    segmentLengthRange: new HS.MathH.RandomRange(40, 80),
    segmentCountRange: new HS.MathH.RandomRange(5, 20),
    segmentDiversionRange: new HS.MathH.RandomAroundPoint(0, Math.PI / 4),
    maxControlWidth: new HS.MathH.RandomRange(5, 10),
    colors: ['#FF7F7F', '#E5FF7F', '#B8FF7F', '#FFBB7F', '#7F7FFF', '#C57FFF'],
    backgroundColor: '#F2F2F2'//'#1E1E1E'
});