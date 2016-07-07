(function() {

    angular.module('app.root.nav.left',[])
    .controller('NavLeft', function ($scope, $timeout, $mdSidenav, $log, nav) {
        $scope.isSectionSelected = isSectionSelected;
        $scope.nav = nav;
        $scope.navMethods = {
            isOpen: isOpen,
            toggleOpen: toggleOpen,
            isSelected: isSelected
        };
        $scope.close = function () {
          $mdSidenav('left').close()
            .then(function () {
              $log.debug("close LEFT");
            });
        };
        function isOpen(section) {
          return nav.isSectionSelected(section);
        }

        function isSelected(page) {
          return nav.isPageSelected(page);
        }

        function toggleOpen(section) {
          nav.toggleSelectSection(section);
        }

        function isSectionSelected(section) {
          var selected = false;
          var openedSection = nav.openedSection;
          if(openedSection === section){
            selected = true;
          }
          else if(section.children) {
            section.children.forEach(function(childSection) {
              if(childSection === openedSection){
                selected = true;
              }
            });
          }
          return selected;
        }
    });

})();
