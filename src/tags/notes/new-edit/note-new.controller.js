'use strict'

angular.module('app.notes')
    .controller('NewNoteController', NewNoteController)

function NewNoteController ($rootScope, $scope, $q, $state, $stateParams, $timeout, Warehouse) {
  utils.delayView($rootScope, $q, $timeout)
  $scope.header = 'NOTES.NEW'
  $scope.saveNote = saveNote
  $scope.note = {
    content: {
      text: '',
      contents: []
    },
    tags: []
  }

  if ($stateParams.name) {
    $scope.note.name = $stateParams.name
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
      Warehouse.createItem($scope.note)
      $state.go('notes')
      return true
    }
  }
}
