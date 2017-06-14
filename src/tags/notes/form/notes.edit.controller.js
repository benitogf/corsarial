'use strict'

angular.module('app.notes')
    .controller('NotesEditController', NotesEditController)

function NotesEditController ($rootScope, $scope, $q, $state, $stateParams, $timeout, Warehouse) {
  $scope.header = 'NOTES.EDIT'
  $scope.saveNote = saveNote
  Warehouse.getItem($stateParams.id).then(function (data) {
    $timeout(load.bind(data), 0)
  }).catch(function () {
    $state.go('error')
  })

  function load () {
    $scope.note = this
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
      $rootScope.loading = true
      return Warehouse.updateItem($scope.note).then(function () {
        $state.go('notes.list')
        return true
      })
    }
  }
}
