'use strict';

angular.module('app.nav')
    .directive('navRight', navRight);

function navRight() {
    var directive = {
        restrict: 'E',
        template: require('./nav-right.html'),
        controller: NavRightController,
        controllerAs: 'vm'
    };
    return directive;
}

function NavRightController($mdSidenav, i18nService, $translate) {
    var vm = this;
    vm.languages = i18nService.languages;
    vm.selectedLang = $translate.use();
    vm.savePreferences = savePreferences;
    vm.close = close;
    function savePreferences() {
      close().then(function() {
          $translate.use(vm.selectedLang);
      });
    }

    function close() {
      return $mdSidenav('right').close();
    }
}
