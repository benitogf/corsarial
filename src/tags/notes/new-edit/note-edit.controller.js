'use strict'

angular.module('app.notes')
    .controller('EditNoteController', EditNoteController)

function EditNoteController ($rootScope, $scope, $location, $stateParams, Warehouse) {
  $scope.header = 'NOTES.EDIT'
  $scope.saveNote = saveNote
  $scope.note = Warehouse.getItem($stateParams.id)
  if (!$scope.note) {
    $location.path('/404')
  }

  function saveNote () {
    if ($scope.noteForm.$invalid) {
      $rootScope.$broadcast('show-form-errors')
      return false
    } else {
      Warehouse.updateItem($scope.note)
      $location.path('/notes')
      return true
    }
  }
}
