'use strict'

angular.module('mdD3Graph', [])
.directive('mdD3Graph', mdD3Graph)

function mdD3Graph () {
  var directive = {
    restrict: 'E',
    template: require('./md-d3-graph.html'),
    link: mdD3GraphLink
  }

  function mdD3GraphLink ($scope, element) {
    // http://codepen.io/jackrugile/pen/eBpxXp
    $scope.draw = draw
    $scope.init = init

    $scope.$on('$destroy', function () {
      $scope.timer.stop()
    })

    init()

    function init () {
      $scope.canvas = element.find('canvas')[0]
      $scope.ctx = $scope.canvas.getContext('2d')
      $scope.w = $scope.canvas.width = 220
      $scope.h = $scope.canvas.height = 220
      $scope.cx = $scope.w / 2
      $scope.cy = $scope.h / 2
      $scope.orbCount = 200
      $scope.pathCount = 6
      $scope.border = 50
      $scope.orbs = []
      $scope.tick = 0
      for (let i = 0; i < $scope.orbCount; i++) {
        $scope.orbs.push({
          x: $scope.cx,
          y: $scope.cy,
          vx: 0,
          vy: 0,
          a: 0.075,
          path: []
        })
      }
      $scope.timer = d3.timer($scope.draw)
    }

    function rand (min, max) {
      return Math.random() * (max - min) + min
    }

    function dist (x1, y1, x2, y2) {
      let dx = x1 - x2
      let dy = y1 - y2
      return Math.sqrt(dx * dx + dy * dy)
    }

    function draw () {
      $scope.ctx.save()
      $scope.ctx.clearRect(0, 0, $scope.w, $scope.h)
      $scope.ctx.globalCompositeOperation = 'source-over'
      $scope.ctx.beginPath()
      $scope.ctx.arc($scope.cx, $scope.cy, $scope.border * (1 + Math.sin($scope.tick / 40) * 0.15), 0, Math.PI * 2)
      $scope.ctx.fillStyle = '#F0F0F0'
      $scope.ctx.fill()
      $scope.ctx.beginPath()
      $scope.ctx.arc($scope.cx, $scope.cy, ($scope.border / 2) * (1 + Math.cos($scope.tick / 40) * 0.15), 0, Math.PI * 2)
      $scope.ctx.fillStyle = '#000'
      $scope.ctx.fill()
      $scope.ctx.globalCompositeOperation = 'xor'
      $scope.ctx.beginPath()
      $scope.orbs.forEach(function (orb) {
        orb.vx += rand(-orb.a, orb.a)
        orb.vy += rand(-orb.a, orb.a)
        if (Math.abs(orb.vx) > 2) {
          orb.vx *= 0.99
        }
        if (Math.abs(orb.vy) > 2) {
          orb.vy *= 0.99
        }
        orb.x += orb.vx
        orb.y += orb.vy
        if (dist(orb.x, orb.y, $scope.cx, $scope.cy) >= $scope.border) {
          orb.vx += ($scope.cx - orb.x) * 0.001
          orb.vy += ($scope.cy - orb.y) * 0.001
        }
        orb.path.push([ orb.x, orb.y ])
        if ($scope.tick >= $scope.pathCount) {
          orb.path.shift()
        }
        $scope.ctx.moveTo(orb.x, orb.y)
        $scope.ctx.lineTo(orb.path[ 0 ][ 0 ], orb.path[ 0 ][ 1 ])
      })
      $scope.ctx.lineWidth = (1 + Math.sin($scope.tick / 20)) * 0.75
      $scope.ctx.strokeStyle = '#000'
      $scope.ctx.stroke()
      $scope.tick++
      $scope.ctx.restore()
    }
  }

  return directive
}
