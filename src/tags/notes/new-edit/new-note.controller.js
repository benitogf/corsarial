'use strict';

angular.module('app.notes')
    .controller('NewNoteController', NewNoteController);

function NewNoteController($rootScope, $scope, $log, $routeParams) {
    $scope.header = 'NOTES.NEW';
    $scope.saveNote = saveNote;
    $scope.note = {
        tags: []
    };
    if ($routeParams.name) {
        $scope.note.name = $routeParams.name;
    }

    function saveNote() {
        $rootScope.$broadcast('show-form-errors');
    }
}
