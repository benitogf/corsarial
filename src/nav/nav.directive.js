'use strict'

angular.module('app.nav')
    .directive('mdNav', mdNav)

function mdNav () {
  return {
    restrict: 'E',
    template: require('./nav.html'),
    controller: NavController
  }
}

function NavController ($scope, $mdSidenav, $translate) {
  $scope.toggleLeft = buildToggler('left')
  $scope.toggleRight = buildToggler('right')

  $scope.hide = function (nav) {
    return $mdSidenav(nav).close()
  }

  $scope.show = function (nav) {
    $scope['toggle' + _.capitalize(nav)]('preferences')
  }

  $scope.isOpenRight = function () {
    return $mdSidenav('right').isOpen()
  }

  $scope.isOpenLeft = function () {
    return $mdSidenav('left').isOpen()
  }
  function buildToggler (navID) {
    return function (section) {
      if (section) {
        $scope.section = section
        $scope.lang = $translate.use()
        $scope.header = 'NAV.' + _.toUpper(section)
      }
      return $mdSidenav(navID).toggle()
    }
  }
}
