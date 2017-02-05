require('./theme/theme.module')
require('../i18n/i18n.service')
require('../nav/nav.module')
require('./loader/loader.directive')
require('../../lib/warehouse/warehouse.service')
require('../../lib/md-quill/md-quill')
require('../../lib/md-form-error/md-form-error')
require('../../lib/md-grid/md-grid')
require('../../lib/md-d3-graph/md-d3-graph')
require('angular-ui-router')

angular.module('app.root', [
  'ui.router',
  'angularMoment',
  'i18n',
  'app.nav',
  'app.theme',
  'mdLoader',
  'warehouse',
  'mdQuill',
  'mdGrid',
  'mdD3Graph',
  'mdFormError'
])
.constant('moment', require('moment-timezone'))
.constant('FORMATS', {
  DATE: 'DD.MM.YYYY',
  MOMENT: 'DD.MM.YYYY HH:mm:ss'
})
.run(function ($rootScope, $translate, $transitions, $location, $state, amMoment) {
  amMoment.changeLocale($translate.use())
  $transitions.onSuccess({ }, function (trans) {
    var NavService = trans.injector().get('NavService')
    if (trans.$to().name === 'notes') {
      $state.go('notes.list')
    } else {
      $rootScope.navItem = trans.$to().name
      NavService.getPageByUrl($location.$$path)
    }
  })
})
