'use strict'

angular.module('app.nav')
    .directive('navLeft', navLeft)

function navLeft () {
  var directive = {
    restrict: 'E',
    template: require('./nav-left.html'),
    controller: NavLeftController
  }
  return directive
}

function NavLeftController ($scope, $timeout, $mdSidenav, $location, NavService, Warehouse) {
  $scope.isSectionOpen = isSectionOpen
  $scope.nav = NavService
  $scope.$on('$routeChangeSuccess', function () {
    NavService.getPageByUrl($location.$$path)
  })
  $scope.hub = !!Warehouse.getHub()
  $scope.$on('hub-change', function (ev, status) {
    $scope.hub = status
  })
  $scope.close = function () {
    return $mdSidenav('left').close()
  }
  function isSectionOpen (section) {
    var selected = false
    var openSection = NavService.openSection
    if (openSection === section) {
      selected = true
    } else if (section.children) {
      section.children.forEach(function (childSection) {
        if (childSection === openSection) {
          selected = true
        }
      })
    }
    return selected
  }
}
