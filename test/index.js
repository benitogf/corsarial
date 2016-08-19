var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var fs = require('fs');
var jquery = fs.readFileSync('./node_modules/jquery/dist/jquery.js', 'utf-8');
var angular = fs.readFileSync('./node_modules/angular/angular.js', 'utf-8');
var jsdom = require('jsdom').jsdom;

global.document = jsdom('<html><head></head><body><script></script></body></html>');
global.window = document.defaultView;

(new Function('window', 'document', jquery+angular))(window, document);
global.angular = window.angular;
global.mockUtils = require('./specs/utils');
window.mocha = require('mocha');
global.expect = chai.expect;
global.beforeEach = window.beforeEach = window.mocha.beforeEach;
global.afterEach = window.afterEach = window.mocha.afterEach;
require('../www/js/index.test.js');
