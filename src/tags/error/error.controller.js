(function() {

    angular.module('app.error',[])
    .controller('ErrorController', ErrorController);

    function ErrorController($scope, $log) {
        console.log('error');
        $scope.homeUrl = angular.element('#appData').data('preurl') + '/';
    }

})();
