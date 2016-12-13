var d3 = require('d3');

var ScaleChart = {};

ScaleChart.create = function(dest,props,state,clickCallback){
  this.clickCallback = clickCallback;
  var svg = d3.select(dest).append('svg')
    .attr('class','d3')
    .attr('width',props.width)
    .attr('height',props.height);
  var tooltip = d3.select(dest).append('div')
    .attr('class','tooltip')
    .style('opacity',0);
  // svg.append('g')
  //   .attr('class', 'd3-points');

  this.update(dest,state);
};

ScaleChart.update = function(dest,state) {
  //remake scales/ re-render data
  console.log(state.domain);
  var scales = this._scales(dest,state.domain);
  this._drawPoints(dest,scales,state.data);
};

ScaleChart.destroy = function(dest){
  //Cleanup here
  d3.selectAll("svg > *").remove();
}

ScaleChart._scales = function(dest, domain) {
  if (!domain) {
    return null;
  }

  var width = dest.offsetWidth;
  var height = dest.offsetHeight;
  var x = d3.scaleLinear()
    .range([width/4, 3*width/4])
    .domain(domain.x);

  var y = d3.scaleLinear()
    .range([height, 0])
    .domain([0,10]);

  var z = d3.scaleLinear()
    .range([50, 200])
    .domain(domain.r);

  return {x: x, y: y, z: z};
};

ScaleChart._drawPoints = function(dest,scales,data){
  console.log(data);
  var svg = d3.select('.d3')
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr('cx', function(d) {return scales.x(d.rank)})
    .attr('cy', function(d) {return scales.y(5)})
    .attr('r', function(d) {return scales.z(d.eV)})
    .style('fill', function(d) {return d.color})
    .on('mouseover',function(d){
      var tooltip = d3.select('.tooltip')
        .html(d.name + '</br>' + 'Electoral Votes: ' +d.eV)
        .style('left',(scales.x(d.rank)) + 'px')
        .style('top',(scales.y(5) - scales.z(d.eV)+20) + 'px')
        .style('opacity',1);

      d3.select(this).style('stroke','#6c6c6c')
        .style('stroke-width',5)
        .style('opacity',0.9);

      }
    )
    .on('mouseout',function(){
      var tooltip = d3.select('.tooltip')
        .style('opacity',0);

      d3.select(this).style('stroke-width',0)
        .style('opacity',1);
      }
    )
    .on('click',function(d){
      ScaleChart.clickCallback(d);
      }
    );

}

module.exports = ScaleChart;
