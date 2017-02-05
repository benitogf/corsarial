'use strict'

angular.module('app.notes', [])
    .controller('NotesController', NotesController)

function NotesController ($rootScope, $scope, $q, $state, $translate, $timeout, Warehouse) {
  utils.delayView($rootScope, $q, $timeout)
  $scope.hub = Warehouse.getHub()
}
