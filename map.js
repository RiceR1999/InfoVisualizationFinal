// Keeps track of where in the data we are
var chemical = 0;
var month = 0;
var isPlaying = false;
var lastMonthIndex = data[chemical][4].length - 1;
var firstMonthButton = document.getElementById("first_month");
var previousMonthButton = document.getElementById("previous_month");
var nextMonthButton = document.getElementById("next_month");
var lastMonthButton = document.getElementById("last_month");

// disables buttons for first month, previous month and pause when page loads
updateFirstPrevious(true);
disablePauseButton();

//converts number into according month for display
var monthDict = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
}

// D3 color scale to set color of symbols
var lower_scale;
var upper_scale;
var circles = d3.selectAll("circle");
var slider = document.getElementById("myRange");
var chemicalTitle = document.getElementById("chemicalDisplay");
var monthTitle = document.getElementById("monthDisplay");
var select = document.getElementById("selectNumber");

setScale();
updateColor();

// Resets color scale using month and chemical values
function setScale() {
    isPlaying = false;
    lower_scale = d3.scale.linear()
        .domain([data[chemical][1], data[chemical][2]])
        .range(["#ddddff", "blue"]);
    upper_scale = d3.scale.linear()
        .domain([data[chemical][2], data[chemical][3]])
        .range(["#ffdddd", "red"]);

    slider.max = lastMonthIndex;
    slider.value = 0;
    document.getElementById("upper-label").innerHTML = data[chemical][3];
    document.getElementById("middle-label").innerHTML = data[chemical][2];
    document.getElementById("lower-label").innerHTML = data[chemical][1];
    chemicalTitle.innerHTML = `Chemical: ${data[chemical][0]}`;
    document.getElementById("unit-display").innerHTML = `Average Monthly Reading (${getUnitOfMeasure(chemical)})`;
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
}

function updateFirstPrevious(disabled) {
    firstMonthButton.disabled = disabled;
    previousMonthButton.disabled = disabled;
}

function updateNextLast(disabled) {
    nextMonthButton.disabled = disabled;
    lastMonthButton.disabled = disabled;
}

function updatePlayButtonForSlider() {
    if (month !== lastMonthIndex) {
        enablePlayButton();
    }
}

function updateButtons() {
    if (month == 0) {
        updateFirstPrevious(true);
        updateNextLast(false);
        enablePlayButton();
    } else if (month == lastMonthIndex) {
        updateFirstPrevious(false);
        updateNextLast(true);
        disablePlayButton();
        disablePauseButton();
    } else {
        updateFirstPrevious(false);
        updateNextLast(false);
    }
}

function enablePlayButton() {
    document.getElementById("playButton").disabled = false;
}

function enablePauseButton() {
    document.getElementById("pauseButton").disabled = false;
}

function disablePlayButton() {
    document.getElementById("playButton").disabled = true;
}

function disablePauseButton() {
    document.getElementById("pauseButton").disabled = true;
}

function updateColorAndButtons() {
    updateColor();
    updateButtons();
}

// Updates circles and scaling after changing value of select field
select.onchange = function () {
    chemical = select.value;
    setScale();
    month = 0;
    updateColorAndButtons();
    enablePlayButton();
    disablePauseButton();
}

// Display data for first month
firstMonthButton.onclick = function () {
    month = 0;
    slider.value = month;
    updateColorAndButtons();
    enablePlayButton();
}

// Display data for previous month
previousMonthButton.onclick = function () {
    month -= 1;
    slider.value = month;
    updateColorAndButtons();
    enablePlayButton();
}

// Display data for next month
nextMonthButton.onclick = function () {
    month += 1;
    slider.value = month;
    updateColorAndButtons();
}

// Display data for last month
lastMonthButton.onclick = function () {
    month = lastMonthIndex;
    slider.value = month;
    updateColorAndButtons();
}

//causes a delay for specified amount of ms
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))



//increments the months every 1/4 second
document.getElementById("playButton").onclick = async function () {
    disablePlayButton();
    enablePauseButton();
    isPlaying = true;
    var waitTime = 250;
    var maxMonths = data[chemical][4].length;

    for (i = month; i < maxMonths; i++) {
        if (isPlaying == false) {
            break;
        }
        i = month;
        month++;
        slider.value = month;
        updateColor();
        await sleep(waitTime);
        updateButtons();
    }
}

//pasues play
document.getElementById("pauseButton").onclick = function () {
    isPlaying = false;
    slider.disabled = false;
    updateButtons();
    enablePlayButton();
    disablePauseButton();
}

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    month = Number(this.value);
    updateColorAndButtons();
    updatePlayButtonForSlider();
}

function getUnitOfMeasure(index) {
    if(index < 3) {
        return "µg/l";
    } else {
        return "mg/l";
    }
}
