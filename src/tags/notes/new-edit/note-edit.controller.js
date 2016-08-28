'use strict'

angular.module('app.notes')
    .controller('EditNoteController', EditNoteController)

function EditNoteController ($rootScope, $scope, $routeParams) {
  $scope.header = 'NOTES.EDIT'
  $scope.saveNote = saveNote
  $scope.note = {
    tags: []
  }
  if ($routeParams.name) {
    $scope.note.name = $routeParams.name
  }

  function saveNote () {
    if ($scope.noteForm.$invalid) {
      $rootScope.$broadcast('show-form-errors')
      return false
    } else {
      return true
    }
  }
}
