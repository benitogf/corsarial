(function() {

    angular.module('app.home',[])
    .controller('HomeController', HomeController);

    function HomeController($scope, $log) {
        $log.info('home');
    }

})();
