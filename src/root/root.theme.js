require('../../lib/svg-assets-cache');

(function() {

    angular.module('app.theme',[
        'ngMaterial',
        'material.svgAssetsCache'
    ])
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('grey', {
          'default': '900'
        });
    })

})();
