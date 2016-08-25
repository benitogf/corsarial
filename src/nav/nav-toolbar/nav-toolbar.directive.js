'use strict'

angular.module('app.nav')
    .directive('navToolbar', navToolbar)

function navToolbar () {
  var directive = {
    restrict: 'E',
    template: require('./nav-toolbar.html')
  }
  return directive
}
