var chai = require('chai')
var fs = require('fs')
var path = require('path')
var angular = fs.readFileSync('./node_modules/angular/angular.js', 'utf-8')
var jsdom = require('jsdom/lib/old-api.js').jsdom
var LocalStorage = require('node-localstorage').LocalStorage
global._ = require('lodash')
global.d3 = require('d3')
global.localStorage = new LocalStorage('./www/js/localStorageTemp')
global.sessionStorage = new LocalStorage('./www/js/sessionStorageTemp')
global.document = jsdom('<html><head></head><body><script></script></body></html>')
global.window = document.defaultView
global.$ = global.window.$ = global.window.jQuery = global.jQuery = require('jquery')
global.mockUtils = global.utils = require('./specs/utils')
global.window.mocha = require('mocha')
global.navigator = global.window.navigator = { platform: 'jsdom', userAgent: 'jsdom' }
global.Node = global.window.Node
global.Text = global.window.Text
global.HTMLElement = global.window.HTMLElement
global.MutationObserver = mockUtils.MutationObserver
global.document.getSelection = mockUtils.getSelection
global.window.localStorage = global.localStorage
global.window.sessionStorage = global.sessionStorage
global.expect = chai.expect
global.beforeEach = window.beforeEach = window.mocha.beforeEach
global.afterEach = window.afterEach = window.mocha.afterEach
global.Object.entries = global.utils.ObEntries
global.Object.values = global.utils.ObValues
require('indexeddbshim')(global, {checkOrigin: false}); // eslint-disable-line
(new Function('window', angular))(global.window); // eslint-disable-line
global.window.angular.bootstrap = false
global.angular = global.window.angular
global.Dexie = global.window.Dexie = require('dexie')
window.Dexie.dependencies.indexedDB = global.indexedDB
window.Dexie.dependencies.IDBKeyRange = global.IDBKeyRange
require(path.join(process.cwd(), '/www/js/index.specs.js'))
