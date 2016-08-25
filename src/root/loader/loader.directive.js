'use strict'

angular.module('mdLoader', [])
    .directive('mdLoader', mdLoader)

function mdLoader () {
  return {
    template: require('./loader.html')
  }
}
