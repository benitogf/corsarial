(function() {

    angular.module('i18n',['pascalprecht.translate', 'ngCookies']).
    factory('i18nService', function() {
      self = {
         languages: ['EN', 'ZH']
      };


      return self;
    }).
    config(translateConfig);

    function translateConfig($translateProvider) {
        $translateProvider
          .translations('EN',
              utils.getTranslation(_.merge(
                  require('../../lib/*/i18n/en.json', {mode: 'hash'}),
                  require('../*/*/i18n/en.json', {mode: 'hash'}),
                  require('../*/i18n/en.json', {mode: 'hash'}),
                  require('./en.json', {mode: 'hash'})
                  )
               )
          )
          .translations('ZH',
              utils.getTranslation(_.merge(
                  require('../../lib/*/i18n/zh.json', {mode: 'hash'}),
                  require('../*/*/i18n/zh.json', {mode: 'hash'}),
                  require('../*/i18n/zh.json', {mode: 'hash'}),
                  require('./zh.json', {mode: 'hash'})
                  )
               )
          )
          .preferredLanguage('EN')
          .useSanitizeValueStrategy(null)
          .useLocalStorage();
    }

})();
