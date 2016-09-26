var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
var fs = require('fs')
var angular = fs.readFileSync('./node_modules/angular/angular.js', 'utf-8')
var jsdom = require('jsdom').jsdom
var LocalStorage = require('node-localstorage').LocalStorage
global.localStorage = new LocalStorage('./www/js/localStorageTemp')
global.document = jsdom('<html><head></head><body><script></script></body></html>')
global.window = document.defaultView
global.$ = global.window.$ = global.window.jQuery = require('jquery');
(new Function('window', 'document', angular))(window, document); // eslint-disable-line
global.angular = window.angular
global._ = require('lodash')
global.d3 = require('d3')
global.mockUtils = require('./specs/utils')
global.window.mocha = require('mocha')
global.navigator = { platform: 'jsdom' }
global.Node = global.window.Node
global.Text = global.window.Text
global.HTMLElement = global.window.HTMLElement
global.MutationObserver = mockUtils.MutationObserver
global.document.getSelection = mockUtils.getSelection
global.window.localStorage = global.localStorage
global.expect = chai.expect
global.beforeEach = window.beforeEach = window.mocha.beforeEach
global.afterEach = window.afterEach = window.mocha.afterEach
require('../www/js/index.specs.js')
