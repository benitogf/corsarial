'use strict'

angular.module('app.nav')
    .directive('navLink', navLink)

function navLink (NavService) {
  return {
    scope: {
      section: '='
    },
    template: require('./nav-link.html'),
    link: function ($scope) {
      $scope.isSelected = function () {
        return NavService.isPageSelected($scope.section)
      }
    }
  }
}
