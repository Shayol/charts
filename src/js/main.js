import "../scss/main.scss";
import * as d3 from "d3";

var data = [{ name: "Baden-Württemberg", number: 414 },
        { name: "Bayern", number: 640 },
        { name: "Berlin", number: 1125 },
        { name: "Brandenburg", number: 1002 },
        { name: "Bremen", number: 645 },
        { name: "Hessen", number: 381 },
        { name: "Mecklenburg-Vorpommern", number: 755 }];



        var width = 500,
            barHeight = 20;

        var x = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return d.number; })])
            .range([0, width]);

        var yAxis = d3.axisLeft(x)
            .ticks(data.length);


        var chart = d3.select(".chart")
            .attr("width", width)
            .attr("height", barHeight * data.length);

        chart.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        var bar = chart.selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function (d, i) { return "translate(0," + i * barHeight + ")"; });

        bar.append("rect")
            .attr("width", function (d) { return x(d.number); })
            .attr("height", barHeight - 1);

        bar.append("text")
            .attr("x", function (d) { return x(d.number) - 3; })
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(function (d) { return d.number; });