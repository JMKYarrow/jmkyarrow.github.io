window.onload = function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var zoom = 2;

    function generateDragonRecursively(n) {
        if (n > 0) {
            points = generateDragonRecursively(n - 1);
            return generateNewLayer(points);
        }
        else {
            return [[0, 0], [1, 0]];
        }
    }

    function generateNewLayer(points) {
        var newPoints = [];
        for (var j = 0; j < points.length; j++) {
            if (j < points.length - 1) {
                newPoints.push(points[j]);

                var xA = points[j][0];
                var yA = points[j][1];

                var xB = points[j + 1][0];
                var yB = points[j + 1][1];

                var lengthAB = Math.sqrt(Math.pow(xB - xA, 2) + Math.pow(yB - yA, 2));
                var midX = (xA + xB) / 2;
                var midY = (yA + yB) / 2;

                var diffX = xB - xA
                var diffY = yB - yA;

                var offsetLength = (j % 2 == 0 ? lengthAB : -lengthAB) / 2;
                var newX;
                var newY;

                var angleAB;
                if (diffX == 0) {
                    angleAB = diffY > 0 ? Math.PI / 2 : 3 * Math.PI / 2;
                }
                else if (diffY == 0) {
                    angleAB = diffX > 0 ? 0 : Math.PI;
                }
                else if (diffX > 0) {
                    angleAB = diffY > 0 ? Math.PI / 4 : 7 * Math.PI / 4;
                }
                else if (diffX < 0) {
                    angleAB = diffY > 0 ? 3 * Math.PI / 4 : 5 * Math.PI / 4;
                }

                newX = midX + (Math.cos(angleAB + (Math.PI / 2)) * offsetLength);
                newX *= 1000;
                newX = Math.round(newX);
                newX /= 1000;

                newY = midY + (Math.sin(angleAB + (Math.PI / 2)) * offsetLength);
                newY *= 1000;
                newY = Math.round(newY);
                newY /= 1000;

                newPoints.push([newX, newY]);
            }
            else {
                newPoints.push(points[j]);
            }
        }
        return newPoints;
    }

    var order = 1;
    var points;

    var savedOrder;
    var savedPoints;

    var grd = ctx.createLinearGradient(256,0,512,0);
    grd.addColorStop(0, "#e74c3c");
    grd.addColorStop(0.5, "#1abc9c");
    grd.addColorStop(1, "#8e44ad");
    ctx.strokeStyle = grd;

    function drawDragon() {
        order = document.getElementById("orderEntry").value;

        if (savedOrder == document.getElementById("orderEntry").value - 1) {
            points = generateNewLayer(savedPoints);
            savedPoints = points;
            savedOrder = order;
        }
        else {
            points = generateDragonRecursively(order);
            savedPoints = points;
            savedOrder = order;
        }

        ctx.lineWidth = 16 / (zoom * order);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(zoom * 128, zoom * 128);
        for (var i = 1; i < points.length; i++) {
            ctx.lineTo(zoom * ((128 *  points[i][0]) + 128), zoom * ((128 *  points[i][1]) + 128));
        }
        ctx.stroke();
    }
    
    drawDragon();

    document.getElementById("goButton").onclick = function () { drawDragon(); };
    document.getElementById("orderEntry").onkeydown = function (ev) { if (ev.key == 'Enter') drawDragon(); };

    document.getElementById("zoomInButton").onclick = function () {
        zoom += 0.2;
        drawDragon();
    };

    document.getElementById("zoomOutButton").onclick = function () {
        if (zoom > 1) {
            zoom -= 0.2;
            drawDragon();
        }
    };

    document.getElementById("nextButton").onclick = function () {
        if (order >= 1)
            order++;
        else
            order = 1;
        document.getElementById("orderEntry").value = order;
        drawDragon();
    };

    document.getElementById("prevButton").onclick = function () {
        if (order > 1) {
            order--;
            document.getElementById("orderEntry").value = order;
            drawDragon();
        }
    };

    window.onresize = function () {
        canvas.width = window.innerWidth;
        drawDragon();
    }

    // ************************* //
    //        LEGACY CODE        //
    // ************************* //

    /*function generateDragon(n) {
        var points = [[256, 256], [512, 256]];
        var newPoints = [];
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < points.length; j++) {
                if (j < points.length - 1) {
                    newPoints.push(points[j]);
                    var lengthAB = Math.sqrt(Math.pow(points[j + 1][0] - points[j][0], 2) + Math.pow(points[j + 1][1] - points[j][1], 2));
                    var midAB = [(points[j][0] + points[j + 1][0]) / 2, (points[j][1] + points[j + 1][1]) / 2];
                    var angleAB = Math.atan((points[j + 1][1] - points[j][1]) / (points[j + 1][0] - points[j][0]));
                    //var c = math.pow(lengthAB / 2, 2);
                    //var offsetLength = Math.sqrt(c / 2);
                    //var offsetLength = Math.max(points[j + 1][0] - midAB[0], points[j + 1][1] - midAB[1]);
                    var offsetLength = lengthAB / 2;

                    //alert(offsetLength);

                    if (j % 2 != 0) {
                        offsetLength *= -1;
                    }

                    //alert(angleAB * 180 / Math.PI);
                    newPoints.push([midAB[0] + (Math.cos(angleAB + (Math.PI / 2)) * offsetLength), midAB[1] + (Math.sin(angleAB + (Math.PI / 2)) * offsetLength)]);

                    /*
                    if ((j + i + 1) % 9 == 0) {
                        newPoints.push([]);
                    }
                    else if ((j + i + 1) % 8 == 0) {
                        newPoints.push([]);
                    }
                    else if ((j + i + 1) % 7 == 0) {
                        newPoints.push([midAB[0] - offsetLength, midAB[1] + offsetLength]);
                    }
                    else if ((j + i + 1) % 6 == 0) {
                        newPoints.push([midAB[0], midAB[1] - offsetLength]);
                    }
                    else if ((j + i + 1) % 5 == 0) {
                        newPoints.push([midAB[0] - offsetLength, midAB[1] + offsetLength]);
                    }
                    else if ((j + i + 1) % 4 == 0) {
                        newPoints.push([midAB[0], midAB[1] - offsetLength]);
                    }
                    else if ((j + i + 1) % 3 == 0) {
                        newPoints.push([midAB[0] + offsetLength, midAB[1] + offsetLength]);
                    }
                    else if ((j + i + 1) % 2 == 0) {
                        alert("hi");
                        newPoints.push([midAB[0] - offsetLength, midAB[1] + offsetLength]);
                    }
                    else
                        newPoints.push([midAB[0], midAB[1] + offsetLength]);


                }
                else {
                    newPoints.push(points[j]);
                }
            }
            //alert(newPoints);
            points = newPoints;
            newPoints = [];
        }
        return points;
    }*/

}