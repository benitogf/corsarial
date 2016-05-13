'use strict';

var $ = window.jQuery = window.$ = require('jquery');
//var wsauth = window.wsauth = require('./lib/wsauth');
var angular = window.angular = require('angular');
require('./lib/svg-assets-cache');
require('angular-aria');
require('angular-animate');
require('angular-material');

var app = window.app = {
    init: function () {
      app.host = $('#appData').data('host');
      app.name = $('#appData').data('name');
      //wsauth.init();
    },
    bindEvents: function() {
      document.addEventListener('deviceready', this.init, false);
    },
    hideLoader: function() {
      $('#content').css('opacity', '1');
      $('header').css('opacity', '1');
      $('#loading').css('display', 'none');
    },
    showLoader: function() {
      $('#content').css('opacity', '0');
      $('header').css('opacity', '0');
      $('#loading').css('display', 'block');
    },
    delayLoad: function($q, $timeout) {
      var delay = $q.defer();
      app.showLoader();
      $timeout(function(){
         app.hideLoader();
      }, 1000);
      $timeout(delay.resolve, 1000);
      return delay.promise;
    },
    errorConfirm: function () {
        document.location.reload();
    },
    errorHandler: function (message) {
        console.log('error ' + message);
        navigator.notification.alert(
             message, // message
             app.errorConfirm, // callback to invoke with index of button pressed
             'Error', // title
             'Restart' // buttonLabels
        );
    }
};
app.bindEvents();
angular
  .module('SidenavDemo1', ['ngMaterial', 'material.svgAssetsCache', require('angular-route')])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
     .when('/services', {
      template: require('./tags/services.html'),
      controller: 'servicesController',
      resolve: {
        // cause a 1 second delay
        delay: app.delayLoad
      }
    })
    .when('/', {
      template: require('./tags/root.html'),
      controller: 'rootController',
      resolve: {
        // cause a 1 second delay
        delay: app.delayLoad
      }
    });

    // configure html5
    $locationProvider.html5Mode(false);
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('red', {
        'default': '900'
      });
  })
  .controller('servicesController', function ($scope, $log) {
    console.log('services');
  })
  .controller('rootController', function ($scope, $log) {
    console.log('root');
  })
  .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    $scope.isOpenLeft = function(){
      return $mdSidenav('left').isOpen();
    };
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle();
      };
    }
  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });
    };
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  });
