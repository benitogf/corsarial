(function() {

    angular.module('app.notes')
    .controller('NewNoteController', NewNoteController);

    function NewNoteController($scope, $log, $routeParams) {
        $scope.header = 'NOTES.NEW';
        $scope.note = {};
        if ($routeParams.name) {
            $scope.note.title = $routeParams.name;
        }
    }

})();
