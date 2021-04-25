// Keeps track of where in the data we are
var chemical = 0;
var month = 0;

// D3 color scale to set color of symbols
var color_scale;
var circles = d3.selectAll("circle");

setScale();
updateColor();

// Resets color scale using month and chemical values
function setScale() {
    color_scale = d3.scale.linear()
        .domain([data[chemical][1], data[chemical][2]])
        .range(["red", "blue"]);
}

// Updates colors of circles, using color_scale, and dataset for chemical and month.
function updateColor() {
    circles.data(data[chemical][3][month][2])
        .attr("fill", function (d) {
            if (d == -1) {
                return "black"
            }
            else {
                return color_scale(d)
            }
        });
}

// Updates circles and scaling after changing value of select field
document.getElementById("selectNumber").onchange = function () {
    chemical = document.getElementById("selectNumber").value;
    setScale();
    month = 0;
    updateColor();
}
