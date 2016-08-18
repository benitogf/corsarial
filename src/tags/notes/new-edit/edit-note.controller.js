(function() {

    angular.module('app.notes')
    .controller('EditNoteController', EditNoteController);

    function EditNoteController($scope, $q) {
        $scope.header = 'NOTES.EDIT';
    }

})();
