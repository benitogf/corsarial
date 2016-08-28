'use strict'

angular.module('app.nav')
    .directive('navToggle', navToggle)

function navToggle ($timeout, $mdUtil, NavService) {
  return {
    restrict: 'E',
    scope: {
      section: '='
    },
    template: require('./nav-toggle.html'),
    link: navToggleLink
  }
  function navToggleLink (scope, element) {
    scope.getTargetHeight = getTargetHeight
    scope.isOpen = function () {
      return NavService.isSectionOpen(scope.section)
    }
    scope.toggle = function () {
      NavService.toggleOpenSection(scope.section)
    }
    scope.menu = element.find('ul')
    $mdUtil.nextTick(function () {
      scope.$watch(
              function () {
                return scope.isOpen()
              },
              function (open) {
                var targetHeight = open ? scope.getTargetHeight(scope.menu) : 0
                $timeout(function () {
                  scope.menu.css({height: targetHeight})
                })
              }
            )
    })
  }
  function getTargetHeight (list) {
    var clientHeight = list.prop('childElementCount') * 40
    return clientHeight + 'px'
  }
}
