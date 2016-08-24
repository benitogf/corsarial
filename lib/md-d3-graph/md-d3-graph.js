'use strict';

/* jshint maxcomplexity: 10 */

angular.module('mdD3Graph',[])
.directive('mdD3Graph', mdD3Graph);

function mdD3Graph(){
  var directive = {
      bindToController: true,
      controller: mdD3GraphController,
      controllerAs: 'vm',
      restrict: 'E',
      template: require('./md-d3-graph.html'),
  };

  function mdD3GraphController() {

      //http://bl.ocks.org/mbostock/280d83080497c8c13152
      var radius = 1.5,
          minDistance = 80,
          maxDistance = 120,
          minDistance2 = minDistance * minDistance,
          maxDistance2 = maxDistance * maxDistance;
      var canvas = document.querySelector('.graph');
      var context = canvas.getContext('2d');
      var tau = Math.PI,
          n = 100,
          particles = new Array(n);

      var chart = $('.graph');
      $(window).on('resize', function() {
          chart.attr('width', window.innerWidth);
          chart.attr('height', window.innerHeight);
      }).trigger('resize');

      for (var i = 0; i < n; ++i) {
        particles[i] = {
          x: Math.random() * canvas.clientWidth,
          y: Math.random() *  canvas.clientHeight,
          vx: 0,
          vy: 0
        };
      }

      d3.timer(function() {
          context.save();
          var width = canvas.clientWidth;
          var height = canvas.clientHeight;
          context.clearRect(0, 0, width, height);

          for (var i = 0; i < n; ++i) {
              var p = particles[i];
              p.x += p.vx;
              if (p.x < -maxDistance) {
                  p.x += width + maxDistance * 2;
              } else if (p.x > width + maxDistance) {
                  p.x -= width + maxDistance * 2;
              }
              p.y += p.vy;
              if (p.y < -maxDistance) {
                  p.y += height + maxDistance * 2;
              } else if (p.y > height + maxDistance) {
                  p.y -= height + maxDistance * 2;
              }
              p.vx += 0.2 * (Math.random() - 0.5) - 0.01 * p.vx;
              p.vy += 0.2 * (Math.random() - 0.5) - 0.01 * p.vy;
              context.beginPath();
              context.arc(p.x, p.y, radius, 0, tau);
              context.fill();
          }

          for (i = 0; i < n; ++i) {
              for (var j = i + 1; j < n; ++j) {
                  var pi = particles[i],
                      pj = particles[j],
                      dx = pi.x - pj.x,
                      dy = pi.y - pj.y,
                      d2 = dx * dx + dy * dy;
                  if (d2 < maxDistance2) {
                    context.globalAlpha = d2 > minDistance2 ? (maxDistance2 - d2) / (maxDistance2 - minDistance2) : 1;
                    context.beginPath();
                    context.moveTo(pi.x, pi.y);
                    context.lineTo(pj.x, pj.y);
                    context.stroke();
                  }
              }
          }

          context.restore();
      });
  }

  return directive;
}
