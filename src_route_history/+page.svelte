<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  import d3_timeseries from './lib';

  function createRandomData(n, range, rand) {
    if (range == null) range = [0, 100];
    if (rand == null) rand = 1 / 20;

    var num = range[0] + Math.floor(Math.random() * (range[1] - range[0]));
    var num2 = range[0] + Math.floor(Math.random() * (range[1] - range[0]));
    var num3 = num;
    var d = new Date('2013-01-01');
    var data = [];
    var rgen = d3.randomNormal(0, (range[1] - range[0]) * rand);
    for (var i = 0; i < n; i++) {
      data.push({
        date: d,
        n: num,
        n2: num2,
        n3: num3,
        ci_up: num3 * 1.05,
        ci_down: num3 * 0.95
      });
      d = new Date(d.getTime() + 1000 * 60 * 60 * 24);
      num = num + rgen();
      num3 = num + rgen() / 3;
      num = Math.min(Math.max(num, range[0]), range[1]);
      num2 = num2 + rgen();
      num2 = Math.min(Math.max(num2, range[0]), range[1]);
    }
    return data;
  }

  var data = createRandomData(80, [0, 1000], 0.01);
  // [{date:new Date('2013-01-01'),n:120,n3:200},...]

  /*
  var chart = d3_timeseries()
    .addSerie(data, { x: 'date', y: 'n' }, { interpolate: 'monotone', color: '#333' })
    .width(820);
    */

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  const gradient = DOM.uid();

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  svg.append("linearGradient")
      .attr("id", gradient.id)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", height - margin.bottom)
      .attr("x2", 0)
      .attr("y2", margin.top)
    .selectAll("stop")
      .data(d3.ticks(0, 1, 10))
    .join("stop")
      .attr("offset", d => d)
      .attr("stop-color", color.interpolator());

  svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", gradient)
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

  const chart = svg.node();

  onMount(() => chart('#chart'));
</script>

<h1>Chart goes here</h1>
<div id="chart"></div>

<p>Hopefully above 👆</p>
