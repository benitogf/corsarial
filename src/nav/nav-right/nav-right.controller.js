(function() {

    angular.module('nav.right',[])
    .controller('NavRight', function ($scope, $timeout, $mdSidenav, $log, i18nService,
      $translate) {
      $scope.vm = {};
      var vm = $scope.vm;
      $scope.languages = i18nService.languages;
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
      };
    });

})();
