'use strict'

require('angular-cookies')
require('angular-translate')
require('angular-translate-storage-cookie')
require('angular-translate-storage-local')

angular.module('i18n', ['pascalprecht.translate', 'ngCookies'])
.factory('i18nService', function () {
  var service = {
    languages: ['EN', 'ZH']
  }

  return service
})
.config(translateConfig)
function getTranslation (files) {
  var translation = {}
  _.forEach(files, function (value) {
    _.extend(translation, value)
  })
  return translation
}
function translateConfig ($translateProvider) {
  $translateProvider
      .translations('EN',
          getTranslation(_.merge(
              require('../../lib/*/i18n/en.json', {mode: 'hash'}),
              require('../*/*/i18n/en.json', {mode: 'hash'}),
              require('../*/i18n/en.json', {mode: 'hash'}),
              require('./en.json', {mode: 'hash'})
              )
           )
      )
      .translations('ZH',
          getTranslation(_.merge(
              require('../../lib/*/i18n/zh.json', {mode: 'hash'}),
              require('../*/*/i18n/zh.json', {mode: 'hash'}),
              require('../*/i18n/zh.json', {mode: 'hash'}),
              require('./zh.json', {mode: 'hash'})
              )
           )
      )
      .preferredLanguage('EN')
      .useSanitizeValueStrategy(null)
      .useLocalStorage()
}
