window.onload = function () {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#FF0000";

    function generateDragon(n) {
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
                        newPoints.push([midAB[0], midAB[1] + offsetLength]);*/


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
    }

    function drawDragon(points, order) {
        ctx.moveTo(points[0][0] + ((order-1) * 320) , points[0][1])
        for (var i = 1; i < points.length; i++) {
            ctx.lineTo(points[i][0] + ((order - 1) * 320), points[i][1]);
        }
        ctx.stroke();
    }
    
    var order = 1;
    setInterval(function () {
        drawDragon(generateDragon(order),order);
        order++;
    },2000);
}