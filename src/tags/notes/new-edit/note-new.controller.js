'use strict'

angular.module('app.notes')
    .controller('NewNoteController', NewNoteController)

function NewNoteController ($rootScope, $scope, $log, $routeParams) {
  $scope.header = 'NOTES.NEW'
  $scope.saveNote = saveNote
  $scope.note = {
    content: {
      text: '',
      contents: []
    },
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
