(function() {

    angular.module('app.root.nav.link',[])
    .directive('navLink', function() {
      return {
        scope: {
          section: '='
        },
        template: require('./nav-link.html'),
        link: function($scope, $element) {
          var controller = $element.parent().controller();
        //  console.log(controller);
        //   $scope.isSelected = function() {
        //     return controller.isSelected($scope.section);
        //     //return false;
        //   };
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
