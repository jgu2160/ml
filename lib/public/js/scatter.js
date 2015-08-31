var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
.range([0, width]);

var y = d3.scale.linear()
.range([height, 0]);

var color = d3.scale.ordinal()
.domain(["setosa", "versicolor", "virginica"])
.range(["#92CDCF","#cf92af", "#2185C5"]);

var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom");

var yAxis = d3.svg.axis()
.scale(y)
.orient("left");

var svg = d3.select(".scatter").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var fillColor = "#EEEFF7";

d3.tsv("../data/flowers.tsv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
        d.sepalLength = +d.sepalLength;
        d.sepalWidth = +d.sepalWidth;
    });

    x.domain(d3.extent(data, function(d) { return d.sepalWidth; })).nice();
    y.domain(d3.extent(data, function(d) { return d.sepalLength; })).nice();

    svg.append("g")
    .attr("class", "x scatteraxis")
    .attr("fill", fillColor)
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("fill", fillColor)
    .attr("class", "scatterlabel")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Sepal Width (cm)");

    svg.append("g")
    .attr("class", "y scatteraxis")
    .attr("fill", fillColor)
    .call(yAxis)
    .append("text")
    .attr("fill", fillColor)
    .attr("class", "scatterlabel")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Sepal Length (cm)");

    attachScatterGroup(svg, data, "setosa", 0);
    attachScatterGroup(svg, data, "virginica", 750);
    attachScatterGroup(svg, data, "versicolor", 1500);

    var legend = svg.selectAll(".legend")
    .data(color.domain())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

    legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("fill", fillColor)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });

});

function attachScatterGroup(svg, data, name, delay) {
    svg.selectAll(".dot" + name)
    .data((function(data) {
      var values = [];
      for (var i = 0, len = data.length; i < len; i++) {
        if (data[i].species === name) {
          values.push(data[i]);
        }
      }
      return values;
    })(data))
    .enter().append("circle")
    .attr("class", "dot")
    .attr("r", 3.5)
    .attr("cx", function(d) { return x(d.sepalWidth); })
    .attr("cy", height - 15)
    .style("fill", "#31353D")
    .transition().duration(2000).delay(delay)
    .attr("cx", function(d) { return x(d.sepalWidth); })
    .attr("cy", function(d) { return y(d.sepalLength); })
    .style("fill", function(d) { return color(d.species); });
}
