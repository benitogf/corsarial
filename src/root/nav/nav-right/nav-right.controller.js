(function() {

    angular.module('app.root.nav.right',[])
    .controller('NavRight', function ($scope, $timeout, $mdSidenav, $log) {
      $scope.close = function () {
        $mdSidenav('right').close()
          .then(function () {
            $log.debug("close RIGHT");
          });
      };
    });

})();
