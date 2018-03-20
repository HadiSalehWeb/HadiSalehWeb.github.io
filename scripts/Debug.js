var Debug = (function () {

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.push = function (a, l) {
        //'Pushes' the point at angle (a) for (l) pixels
        return new Point(this.x + l * Math.cos(a), this.y + l * Math.sin(a));
    }

    return {
        Point: Point,
        drawPoint: function (p, radius, color, ctx) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.closePath();

            ctx.fillStyle = color;
            ctx.fill();
        },
        drawLine: function (p1, p2, color, ctx) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.closePath();

            ctx.strokeStyle = color;
            ctx.stroke();
        },
        drawVector: function (root, angle, length, color, ctx) {
            var dest = root.push(angle, length);
            ctx.beginPath();
            ctx.moveTo(root.x, root.y);
            ctx.lineTo(dest.x, dest.y);
            ctx.closePath();

            ctx.strokeStyle = color;
            ctx.stroke();
        }
    }
})();