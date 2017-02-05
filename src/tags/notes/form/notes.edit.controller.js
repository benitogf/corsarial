'use strict'

angular.module('app.notes')
    .controller('NotesEditController', NotesEditController)

function NotesEditController ($rootScope, $scope, $q, $state, $stateParams, $timeout, Warehouse) {
  utils.delayView($rootScope, $q, $timeout)
  $scope.header = 'NOTES.EDIT'
  $scope.saveNote = saveNote
  $scope.note = Warehouse.getItem($stateParams.id)
  if (!$scope.note) {
    $state.go('error')
  }

  function validForm () {
    // https://github.com/angular/material/issues/8476
    var error = Object.keys($scope.noteForm.$error) || []
    return $scope.noteForm.$invalid && !((error.indexOf('md-max-chips') !== -1) && (error.length === 1))
  }

  function saveNote () {
    if (validForm()) {
      $rootScope.$broadcast('show-form-errors')
      return false
    } else {
      Warehouse.updateItem($scope.note)
      $state.go('notes.list')
      return true
    }
  }
}
