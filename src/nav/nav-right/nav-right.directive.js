'use strict'

angular.module('app.nav')
    .directive('navRight', navRight)

function navRight () {
  var directive = {
    restrict: 'E',
    template: require('./nav-right.html'),
    controller: NavRightController,
    controllerAs: 'vm'
  }
  return directive
}

function NavRightController ($rootScope, $mdSidenav, i18nService, $translate, amMoment) {
  var vm = this
  vm.languages = i18nService.languages
  vm.selectedLang = $translate.use()
  vm.changeLang = changeLang

  function changeLang () {
    $translate.use(vm.selectedLang)
    amMoment.changeLocale(vm.selectedLang)
    $rootScope.$broadcast('grid-reload')
  }
}
