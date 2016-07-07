(function() {

    angular.module('app.root.nav.toggle',[])
    .directive('navToggle', function($timeout, $mdUtil) {
      return {
        scope: {
          section: '=',
          methods: '='
        },
        template: require('./nav-toggle.html'),
        link: function($scope, $element) {
          $scope.isOpen = function() {
            return $scope.methods.isOpen($scope.section);
            //return false;
          };
          $scope.toggle = function() {
            $scope.methods.toggleOpen($scope.section);
          };

          $mdUtil.nextTick(function() {
            $scope.$watch(
              function () {
                return $scope.isOpen($scope.section);
              },
              function (open) {
                var $ul = $element.find('ul');

                var targetHeight = open ? getTargetHeight() : 0;
                $timeout(function () {
                  $ul.css({height: targetHeight + 'px'});
                }, 0, false);

                function getTargetHeight() {
                  var targetHeight;
                  $ul.addClass('no-transition');
                  $ul.css('height', '');
                  targetHeight = $ul.prop('clientHeight');
                  $ul.css('height', 0);
                  $ul.removeClass('no-transition');
                  return targetHeight;
                }
              }
            );
          });

          var parentNode = $element[0].parentNode.parentNode.parentNode;
          if(parentNode.classList.contains('parent-list-item')) {
            var heading = parentNode.querySelector('h2');
            $element[0].firstChild.setAttribute('aria-describedby', heading.id);
          }
        }
      };
    });

})();
