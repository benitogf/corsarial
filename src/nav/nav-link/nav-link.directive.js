(function() {

    angular.module('nav.link',[])
    .directive('navLink', function(NavService) {
      return {
        scope: {
          section: '='
        },
        template: require('./nav-link.html'),
        link: function($scope, $element) {;
          //console.log($scope.section);
        //  console.log(controller);
          $scope.isSelected = function() {
            return NavService.isPageSelected($scope.section);
            //return false;
          };

          //$scope.select = nav.selectPage;
          //
        //   $scope.focusSection = function() {
        //     // set flag to be used later when
        //     // $locationChangeSuccess calls openPage()
        //     controller.autoFocusContent = true;
        //   };
        }
      };
    });
})();
