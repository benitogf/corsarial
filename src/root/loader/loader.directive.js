(function() {

    angular.module('mdLoader', [])
    .directive('mdLoader', mdLoader);

    function mdLoader() {
      return {
        controller: LoaderController,
        template: require('./loader.html')
      };
    }

    function LoaderController($scope, $log) {
      //$log.info('bath the pug');
    }
})();
