(function() {

    angular.module('mdNav', [])
    .directive('mdNav', mdNav);

    function mdNav() {
      return {
        controller: NavController,
        template: require('./nav.html')
      };
    }

    function NavController($scope, $mdSidenav, $translate, $log) {
      $scope.toggleLeft = buildToggler('left');
      $scope.toggleRight = buildToggler('right');

      $scope.hide = function(nav) {
          return $mdSidenav(nav).close();
      }

      $scope.show = function(nav) {
           $scope['toggle'+_.capitalize(nav)]('preferences');
      }

      $scope.isOpenRight = function(){
        return $mdSidenav('right').isOpen();
      };

      $scope.isOpenLeft = function(){
        return $mdSidenav('left').isOpen();
      };
      function buildToggler(navID) {
        return function(section) {
          if (section) {
              $scope.leftSection = section;
              $scope.header = 'NAV.'+_.toUpper(section);
          }
          return $mdSidenav(navID).toggle();
        };
      }
    }
})();
