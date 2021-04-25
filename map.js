// Keeps track of where in the data we are
var chemical = 0;
var month = 0;

//converts number into according month for display
var monthDict = {
    1:"January",
    2:"February",
    3:"March",
    4:"April",
    5:"May",
    6:"June",
    7:"July",
    8:"August",
    9:"September",
    10:"October",
    11:"November",
    12:"December"
}

// D3 color scale to set color of symbols
var lower_scale;
var upper_scale;
var circles = d3.selectAll("circle");

var chemicalTitle = document.getElementById("chemicalDisplay");
var monthTitle = document.getElementById("monthDisplay");
var select = document.getElementById("selectNumber");

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

    document.getElementById("upper-label").innerHTML = data[chemical][3];
    document.getElementById("middle-label").innerHTML = data[chemical][2];
    document.getElementById("lower-label").innerHTML = data[chemical][1];
    chemicalTitle.innerHTML = `Chemical: ${data[chemical][0]}`;
}

// Updates colors of circles, using color_scale, and dataset for chemical and month.
function updateColor() {
    circles.data(data[chemical][4][month][2])
        .attr("fill", function (d) {
            if (d == -1) {
                return "black";
            }
            else if (d < data[chemical][2]) {
                return lower_scale(d);
            }
            else {
                return upper_scale(d);
            }
        });
    monthTitle.innerHTML = `Date: ${monthDict[data[chemical][4][month][0]]}, ${data[chemical][4][month][1]}`;
    console.log(data[chemical][4][month][2]);
}

// Updates circles and scaling after changing value of select field

select.onchange = function () {
    chemical = select.value;
    setScale();
    month = 0;
    updateColor();
}

// Display data for first month
document.getElementById("first_month").onclick = function () {
    month = 0;
    updateColor();
}

// Display data for previous month
document.getElementById("previous_month").onclick = function () {
    month -= 1;
    updateColor();
}

// Display data for next month
document.getElementById("next_month").onclick = function () {
    month += 1;
    updateColor();
}

// Display data for last month
document.getElementById("last_month").onclick = function () {
    month = data[chemical][4].length - 1;
    updateColor();
}

//causes a delay for specified amount of ms
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))



//increments the months every 1/4 second
var isPlaying = false;
document.getElementById("playButton").onclick = async function () {
    isPlaying = true;
    var waitTime = 250;
    var maxMonths = data[chemical][4].length;
    
    for(i = month; i < maxMonths; i++){
        if(isPlaying==false){
            break;
        }
        month++;
        updateColor();
        await sleep(waitTime);
    }
}

//pasues play
document.getElementById("pauseButton").onclick = function () {
    isPlaying = false;
}
