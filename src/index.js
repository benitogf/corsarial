'use strict';

var $ = window.jQuery = window.$ = require('jquery');
var _ =  window._ = require('lodash');
var moment =  window.moment = require('moment');
var d3 = window.d3 = require('d3');

var angular = window.angular = require('angular');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('./root/root.module');
var app = window.app = require('./root/root.app');
angular.module('app', ['app.root']);
