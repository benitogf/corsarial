(function() {

angular.module('mdD3Graph',[])
.directive('mdD3Graph', mdD3Graph);
function mdD3Graph(){
  var directive = {
      bindToController: true,
      controller: mdD3GraphController,
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
          selected: '=?',// pass a model for the selected items
      },
      template: require('./md-d3-graph.html'),
  };

  function mdD3GraphController($scope, $q, $timeout, $log) {
      var n = 70,
          random = d3.randomNormal(-.3, .3),
          data = d3.range(n).map(random)
          width = 960,
          height = 300;
      var svg = d3.select(".graph")
          .attr('preserveAspectRatio', 'xMinYMin meet')
          .attr('viewBox', '0 0 ' + width + ' ' + height);
      var g = svg.append("g");
      var chart = $('.graph'),
          aspect = chart.width() / chart.height(),
          container = chart.parent().parent().parent();
      $(window).on("resize", function() {
          var targetWidth = container.width();
          var width = targetWidth;
          var height = Math.round(targetWidth / aspect);
          chart.attr("width", width);
          chart.attr("height", height);
      }).trigger("resize");

      var x = d3.scaleLinear()
          .domain([0, n - 1])
          .range([0, width]);
      var y = d3.scaleLinear()
          .domain([-1, 1])
          .range([height, 0]);
      var line = d3.line()
          .x(function(d, i) { return x(i); })
          .y(function(d, i) { return y(d); })
          .curve(d3.curveCatmullRom.alpha(5.6));
      svg.append("defs").append("clipPath")
          .attr("id", "clip")
        .append("rect")
          .attr("width", width)
          .attr("height", height);
      svg.append("g")
          .attr("clip-path", "url(#clip)")
        .append("path")
          .datum(data)
          .attr("class", "line")
        .transition()
          .duration(1000)
          .ease(d3.easeLinear)
          .on("start", tick);
      function tick() {

          // push a new data point onto the back
          data.push(random());

          // pop the old data point off the front
          data.shift();

          // Redraw the line.
          d3.select(this)
              .attr("d", line)
              .attr("transform", null);
          // transition the line
          d3.active(this)
               .attr("transform", "translate(" + x(-1) + ")")
             .transition()
               .on("start", tick);
      }
  }

  return directive;
}
})();
