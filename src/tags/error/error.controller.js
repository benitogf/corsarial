'use strict'

angular.module('app.error', [])
.controller('ErrorController', ErrorController)

function ErrorController ($scope, $log) {
  $log.warn('url not found')
}
