var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var fs = require('fs');
var jquery = fs.readFileSync('./node_modules/jquery/dist/jquery.js', 'utf-8');
var angular = fs.readFileSync('./node_modules/angular/angular.js', 'utf-8');

var	document = require('jsdom').jsdom('<html><head></head><body><script></script></body></html>'),
    window = document.defaultView;

(new Function('window', 'document', jquery))(window, document);
(new Function('window', 'document', angular))(window, document);

global.window = window;
global.document = document;
global.angular = window.angular;
global.mockUtils = (function () {
    return {
        translateProvider: translateProvider,
    };
    function translateProvider($provide) {
          $provide.factory('$translate', function(){
              return {
                  use: function(){
                      return;
                  },
                  instant: function(text){
                      return text;
                  }
              };
          });
    }
})();
window.mocha = require('mocha');
global.expect = chai.expect;
global.beforeEach = window.beforeEach = window.mocha.beforeEach;
global.afterEach = window.afterEach = window.mocha.afterEach;
require('../www/js/index.bundle.js');
require('angular-mocks/angular-mocks');
require('./specs/nav.service.spec.js');
