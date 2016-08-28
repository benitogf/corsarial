'use strict'

require('./icons.module')

angular.module('app.theme', [
  'ngMaterial',
  'app.icons'
])
.config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('grey', {
      'default': '900'
    })
})
