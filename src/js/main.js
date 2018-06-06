import "../scss/main.scss";
import * as d3 from "d3";

var data = [{ name: "Baden-Württemberg", number: 414 },
{ name: "Bayern", number: 640 },
{ name: "Berlin", number: 1125 },
{ name: "Brandenburg", number: 1002 },
{ name: "Bremen", number: 645 },
{ name: "Hessen", number: 381 },
{ name: "Mecklenburg-Vorpommern", number: 755 }];


// bar chart
var width = 500,
    barHeight = 20;

var x = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) { return d.number; })])
    .range([0, width]);

var y = d3.scaleBand()
    .range([0, barHeight * data.length]).padding(0.4);

y.domain(data.map(function (d) { return d.name; }));
var chart = d3.select(".chart").append('g')
    .attr("transform", "translate(" + 150 + "," + 100 + ")")
    .attr("width", width)
    .attr("height", barHeight * data.length);

chart.append("g")
    .attr("transform", "translate(" + 0 + "," + 0 + ")")
    .attr("class", "y axis")
    .call(d3.axisLeft(y));

chart.append("g")
    .attr("transform", "translate(0," + barHeight * data.length + ")")
    .call(d3.axisBottom(x).ticks(8));

var bar = chart.selectAll(".bar")
    .data(data)
    .enter().append("g")
    .attr("transform", function (d, i) { return "translate(1," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", function (d) { return x(d.number); })
    .attr("height", barHeight - 2)
    .attr("transform", "translate(0," + 0 + ")");

bar.append("text")
    .attr("x", function (d) { return x(d.number) + 30; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function (d) { return d.number; });


// pie chart

var pieData = [{name: "Septale Defekte/vaskuläre Fehlverbindungen", percent: 49.5},
              {name: "Ursprungsanomalie der großen Arterien", percent: 8.8},
              {name: "Linksobstruktionen", percent: 16.5},
             {name: "Rechtsobstruktionen", percent: 17.3},
            {name: "sonstige", percent: 8.2}]

var svg = d3.select(".pie-chart"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = Math.min(width, height) / 2;

var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);

var pie = d3.pie().value(function (d) {
    return d.percent;
});

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius)
    .innerRadius(radius - 80);


var arc = g.selectAll(".arc")
    .data(pie(pieData))
    .enter().append("g")
    .attr("class", "arc");

arc.append("path")
    .attr("d", path)
    .attr("fill", function (d, i) { return color(i); });

console.log(arc)

arc.append("text")
    .attr("transform", function (d) {
        return "translate(" + label.centroid(d) + ")";
    })
    .text(function (d, i) { return d.data.percent + "%"; });