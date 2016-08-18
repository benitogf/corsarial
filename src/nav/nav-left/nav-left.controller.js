(function() {

    angular.module('nav.left',[])
    .controller('NavLeft', function ($scope, $timeout, $mdSidenav, $location,
        NavService, $log) {
        $scope.isSectionOpen = isSectionOpen;
        $scope.nav = NavService;
        $scope.$on('$routeChangeSuccess', function () {
          NavService.getPageByUrl($location.$$path);
        });
        $scope.close = function () {
          return $mdSidenav('left').close();
        };
        function isSectionOpen(section) {
          var selected = false;
          var openSection = NavService.openSection;
          if(openSection === section){
            selected = true;
          }
          else if(section.children) {
            section.children.forEach(function(childSection) {
              if(childSection === openSection){
                selected = true;
              }
            });
          }
          return selected;
        }
    });

})();
