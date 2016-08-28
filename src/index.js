'use strict'

window.jQuery = window.$ = require('jquery')
window._ = require('lodash')
window.moment = require('moment')
window.d3 = require('d3')
window.angular = require('angular')
window.utils = require('./root/utils')

require('angular-aria')
require('angular-animate')
require('angular-material')
require('./root/root.module')
require('./tags/tags.module')

angular.module('app', [
  'app.root',
  'app.tags'
])
.config(function ($compileProvider) {
  // required for nwjs, android protocols
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|http|file|chrome-extension):/)
})
