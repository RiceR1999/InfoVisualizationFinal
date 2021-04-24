// Keeps track of where in the data we are
var chemical = 0;
var month = 0;

// D3 color scale to set color of symbols
var color_scale;
var circles = d3.selectAll("circle");

// Resets color scale using month and chemical values
function setScale()
{
   color_scale = d3.scale.linear()
            .domain(data[chemical][1], data[chemical][2])
            .range("red", "blue");
}

// Updates colors of circles, using color_scale, and dataset for chemical and month.
function updateColor() 
{
  circles.data(data) 
            .enter()
            .append("circle")
            .attr("fill", function(d)
                {
                    if(d[chemical][3][month][2][0] == -1){
                        return "black"
                    }
                    else{
                        return color_scale(d[chemical][3][month][2][0])
                    }
                })
}

console.log(data[0]);
console.log(data[0][2]);
console.log(data[0]//chemical
                [3]//3rd element, array of first year
                [0]//month
                [2]//data
                [0]//single data point
                )
