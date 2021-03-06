'use strict'

require('./root/root.module')
require('./tags/tags.module')

angular.module('app', [
  'app.root',
  'app.tags'
])

require('angular-mocks/angular-mocks')
require('../test/specs/*.spec.js', { mode: 'expand' })
