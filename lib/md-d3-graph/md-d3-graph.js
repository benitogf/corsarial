'use strict'

angular.module('mdD3Graph', [])
.directive('mdD3Graph', mdD3Graph)

function mdD3Graph () {
  var directive = {
    restrict: 'E',
    template: require('./md-d3-graph.html'),
    link: mdD3GraphLink
  }

  function mdD3GraphLink (scope, element) {
    // http://bl.ocks.org/mbostock/280d83080497c8c13152
    scope.radius = 1.5
    scope.minDistance = 80
    scope.maxDistance = 120
    scope.n = 20
    scope.tau = Math.PI
    scope.draw = draw
    scope.init = init

    $(window).on('resize', function () {
      var chart = $('.graph')
      chart.attr('width', window.innerWidth)
      chart.attr('height', window.innerHeight)
    }).trigger('resize')

    scope.$on('$destroy', function () {
      scope.timer.stop()
    })

    function init () {
      scope.minDistance2 = scope.minDistance * scope.minDistance
      scope.maxDistance2 = scope.maxDistance * scope.maxDistance
      scope.canvas = element.find('.graph')[0]
      scope.context = scope.canvas.getContext('2d')
      scope.particles = new Array(scope.n)
      for (var i = 0; i < scope.n; ++i) {
        scope.particles[i] = {
          x: Math.random() * scope.canvas.clientWidth,
          y: Math.random() * scope.canvas.clientHeight,
          vx: 0,
          vy: 0
        }
      }
      scope.timer = d3.timer(scope.draw)
    }

    init()

    function draw () {
      scope.context.save()
      var width = scope.canvas.clientWidth
      var height = scope.canvas.clientHeight
      scope.context.clearRect(0, 0, width, height)

      for (var i = 0; i < scope.n; ++i) {
        var p = scope.particles[i]
        p.x += p.vx
        if (p.x < -scope.maxDistance) {
          p.x += width + scope.maxDistance * 2
        } else if (p.x > width + scope.maxDistance) {
          p.x -= width + scope.maxDistance * 2
        }
        p.y += p.vy
        if (p.y < -scope.maxDistance) {
          p.y += height + scope.maxDistance * 2
        } else if (p.y > height + scope.maxDistance) {
          p.y -= height + scope.maxDistance * 2
        }
        p.vx += 0.2 * (Math.random() - 0.5) - 0.01 * p.vx
        p.vy += 0.2 * (Math.random() - 0.5) - 0.01 * p.vy
        scope.context.beginPath()
        scope.context.arc(p.x, p.y, scope.radius, 0, scope.tau)
        scope.context.fill()
      }

      for (i = 0; i < scope.n; ++i) {
        for (var j = i + 1; j < scope.n; ++j) {
          var pi = scope.particles[i]
          var pj = scope.particles[j]
          var dx = pi.x - pj.x
          var dy = pi.y - pj.y
          var d2 = dx * dx + dy * dy
          if (d2 < scope.maxDistance2) {
            scope.context.globalAlpha = d2 > scope.minDistance2 ? (scope.maxDistance2 - d2) / (scope.maxDistance2 - scope.minDistance2) : 1
            scope.context.beginPath()
            scope.context.moveTo(pi.x, pi.y)
            scope.context.lineTo(pj.x, pj.y)
            scope.context.stroke()
          }
        }
      }

      scope.context.restore()
    }
  }

  return directive
}
