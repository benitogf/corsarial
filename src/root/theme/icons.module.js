'use strict'

var assetMap = require('./icons')

angular.module('app.icons', [])
.run(function ($templateCache) {
  angular.forEach(assetMap, function (value, key) {
    $templateCache.put(key, value)
  })
})
