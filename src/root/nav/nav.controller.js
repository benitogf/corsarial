(function() {

    angular.module('app.root.nav.controller',[])
    .controller('NavController', function ($scope, $mdSidenav) {
      $scope.toggleLeft = buildToggler('left');
      $scope.toggleRight = buildToggler('right');

      $scope.isOpenRight = function(){
        return $mdSidenav('right').isOpen();
      };

      $scope.isOpenLeft = function(){
        return $mdSidenav('left').isOpen();
      };
      /**
       * Build handler to open/close a SideNav; when animation finishes
       * report completion in console
       */
      function buildToggler(navID) {
        return function() {
          $mdSidenav(navID)
            .toggle();
        };
      }
  });

})();
