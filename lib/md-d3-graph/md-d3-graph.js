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
      $scope.w = $scope.canvas.width = 300
      $scope.h = $scope.canvas.height = 300
      $scope.cx = $scope.w / 2
      $scope.cy = $scope.h / 2
      $scope.border = 40
      $scope.tick = 0
      $scope.timer = d3.timer($scope.draw)
    }

    function draw () {
      $scope.ctx.save()
      $scope.ctx.clearRect(0, 0, $scope.w, $scope.h)
      $scope.ctx.globalCompositeOperation = 'source-over'
      $scope.ctx.beginPath()
      $scope.ctx.arc($scope.cx, $scope.cy, $scope.border * (1 + (Math.sin($scope.tick / 40) * 0.15)), 0, Math.PI * 2)
      $scope.ctx.fillStyle = '#F0F0F0'
      $scope.ctx.fill()
      $scope.ctx.beginPath()
      $scope.ctx.arc($scope.cx, $scope.cy, ($scope.border / 2) * (1 + (Math.cos($scope.tick / 40) * 0.15)), 0, Math.PI * 2)
      $scope.ctx.fillStyle = '#000'
      $scope.ctx.fill()
      $scope.ctx.globalCompositeOperation = 'xor'
      $scope.ctx.beginPath()
      $scope.ctx.lineWidth = (1 + Math.sin($scope.tick / 20)) * 0.75
      $scope.ctx.strokeStyle = '#000'
      $scope.ctx.stroke()
      $scope.tick++
      $scope.ctx.restore()
    }
  }

  return directive
}
