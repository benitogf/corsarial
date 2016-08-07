(function() {

    angular.module('app.root.nav.left',[])
    .controller('NavLeft', function ($scope, $timeout, $mdSidenav, $log, nav) {
        $scope.isSectionOpen = isSectionOpen;
        $scope.nav = nav;
        $scope.navMethods = {
            isOpen: nav.isSectionOpen,
            toggleOpen: nav.toggleOpenSection,
            isSelected: nav.isPageSelected
        };
        $scope.close = function () {
          $mdSidenav('left').close()
            .then(function () {
              $log.debug("close LEFT");
            });
        };
        function isSectionOpen(section) {
          var selected = false;
          var openSection = nav.openSection;
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
