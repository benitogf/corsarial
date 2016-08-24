'use strict';

angular.module('app.nav')
    .directive('navToggle', navToggle);

function navToggle($timeout, $mdUtil, NavService) {
    return {
        scope: {
          section: '='
        },
        template: require('./nav-toggle.html'),
        link: function($scope, $element) {
            $scope.isOpen = function() {
              return NavService.isSectionOpen($scope.section);
            };
            $scope.toggle = function() {
              NavService.toggleOpenSection($scope.section);
            };

            $mdUtil.nextTick(function() {
              $scope.$watch(
                function () {
                  return NavService.isSectionOpen($scope.section);
                },
                function (open) {
                  var $ul = $element.find('ul');
                  var targetHeight = open ? getTargetHeight() : 0;
                  $timeout(function () {
                    $ul.css({height: targetHeight});
                  });
                  function getTargetHeight() {
                    var clientHeight = $ul.prop('childElementCount') * 40;
                    return clientHeight+'px';
                  }
                }
              );
            });
        }
    };
}
