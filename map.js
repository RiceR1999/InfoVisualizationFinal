// Keeps track of where in the data we are
var chemical = 0;
var month = 0;

// D3 color scale to set color of symbols
var lower_scale;
var upper_scale;
var circles = d3.selectAll("circle");

setScale();
updateColor();

// Resets color scale using month and chemical values
function setScale() {
    lower_scale = d3.scale.linear()
        .domain([data[chemical][1], data[chemical][2]])
        .range(["blue", "white"]);
    upper_scale = d3.scale.linear()
        .domain([data[chemical][2], data[chemical][3]])
        .range(["white", "red"]);
        
}

// Updates colors of circles, using color_scale, and dataset for chemical and month.
function updateColor() {
    circles.data(data[chemical][4][month][2])
        .attr("fill", function (d) {
            if (d == -1) {
                return "black";
            }
            else if (d < data[chemical][2]){
                return lower_scale(d);
            }
            else {
                return upper_scale(d);
            }
        });
    console.log(data[chemical][4][month][2]);
}

// Updates circles and scaling after changing value of select field
document.getElementById("selectNumber").onchange = function () {
    chemical = document.getElementById("selectNumber").value;
    setScale();
    month = 0;
    updateColor();
}

// Temporary until slider is added
document.getElementById("next_month").onclick = function () {
    month += 1;
    updateColor();
}
