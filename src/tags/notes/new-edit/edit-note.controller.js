'use strict';

angular.module('app.notes')
    .controller('EditNoteController', EditNoteController);

function EditNoteController($scope) {
        $scope.header = 'NOTES.EDIT';
}
