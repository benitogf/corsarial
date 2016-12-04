require('./theme/theme.module')
require('../i18n/i18n.service')
require('../nav/nav.module')
require('./loader/loader.directive')
require('../../lib/warehouse/warehouse.service')
require('../../lib/md-quill/md-quill')
require('../../lib/md-form-error/md-form-error')
require('../../lib/md-data-grid/md-data-grid')
require('../../lib/md-d3-graph/md-d3-graph')

angular.module('app.root', [
  'angularMoment',
  'i18n',
  'app.nav',
  'app.theme',
  'mdLoader',
  'warehouse',
  'mdQuill',
  'mdDataGrid',
  'mdD3Graph',
  'mdFormError'
])
.constant('moment', require('moment-timezone'))
.constant('FORMATS', {
  DATE: 'DD.MM.YYYY',
  MOMENT: 'DD.MM.YYYY HH:mm:ss'
})
.run(function (amMoment, $translate) {
  amMoment.changeLocale($translate.use())
})
