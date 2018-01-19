window.onload = function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var zoom = 1;

    function generateDragonRecursively(n) {
        if (n > 0) {
            points = generateDragonRecursively(n - 1);
            var newPoints = [];
            for (var j = 0; j < points.length; j++) {
                if (j < points.length - 1) {
                    newPoints.push(points[j]);
                    var lengthAB = Math.sqrt(Math.pow(points[j + 1][0] - points[j][0], 2) + Math.pow(points[j + 1][1] - points[j][1], 2));
                    var midAB = [(points[j][0] + points[j + 1][0]) / 2, (points[j][1] + points[j + 1][1]) / 2];
                    var angleAB = Math.atan((points[j + 1][1] - points[j][1]) / (points[j + 1][0] - points[j][0]));
                    var offsetLength = lengthAB / 2;

                    if (j % 2 != 0) {
                        offsetLength *= -1;
                    }
                    
                    newPoints.push([midAB[0] + (Math.cos(angleAB + (Math.PI / 2)) * offsetLength), midAB[1] + (Math.sin(angleAB + (Math.PI / 2)) * offsetLength)]);
                    
                    //alert([n, j, (angleAB + (Math.PI / 2)) * 180 / Math.PI]);
                }
                else {
                    newPoints.push(points[j]);
                }
            }
            return newPoints;
        }
        else {
            return [[256, 256], [512*zoom, 256]];
        }
    }

    function generateDragonByTranslation(n) {
        if (n > 0) {
            points = generateDragonByTranslation(n - 1);
            var newPoints = [];

            var firstCopy = points;
            for (var i = 0; i < firstCopy.length; i++) {
                coordinate = firstCopy[i];
                coordinate = [(Math.cos(Math.PI / 4) * coordinate[0]) + (-Math.sin(Math.PI / 4) * coordinate[1]), (Math.sin(Math.PI / 4) * coordinate[0]) + (Math.cos(Math.PI / 4) * coordinate[1])];
                firstCopy[i] = coordinate;
                newPoints.push(coordinate);
            }

            var secondCopy = points;
            for (var i = 0; i < secondCopy.length; i++) {
                coordinate = secondCopy[i];
                coordinate = [((Math.cos(3 * Math.PI / 4) * coordinate[0]) + (-Math.sin(3 * Math.PI / 4) * coordinate[1])) * 2, (Math.sin(3 * Math.PI / 4) * coordinate[0]) + (Math.cos(3 * Math.PI / 4) * coordinate[1])];
                secondCopy[i] = coordinate;
                newPoints.push(coordinate);
            }

            return newPoints;
        }
        else {
            return [[0, 0], [256,0]];
        }
    }

    var order = 1;

    function drawDragon() {
        order = document.getElementById("orderEntry").value;
        var points = generateDragonByTranslation(order);
        ctx.strokeStyle = "#00A66C";
        ctx.lineWidth = 8 * zoom / order;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        for (var i = 0; i < points.length; i++) {
            points[i][0] += 256;
            points[i][1] += 256;
        }
        ctx.moveTo(points[0][0] , points[0][1])
        for (var i = 1; i < points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1]);
            ctx.stroke();
        }
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