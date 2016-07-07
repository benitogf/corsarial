require('../../lib/svg-assets-cache');

(function() {

    angular.module('app.root.theme',[
        'ngMaterial',
        'material.svgAssetsCache'
    ])
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('red', {
          'default': '900'
        });
    })

})();
