'use strict'

require('./*/*.js', { mode: 'expand' })
require('./*/*/*.js', { mode: 'expand' })

angular.module('app.tags', [
  require('angular-route'),
  'app.error',
  'app.hubs',
  'app.notes'
])
.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    // .when('/', {redirectTo: '/notes'})
    .when('/', {
      template: require('./hubs/hubs.html'),
      controller: 'HubsController',
      resolve: {
          // cause a 1 second delay
        delay: utils.delayLoad
      }
    })
    .when('/404', {
      template: require('./error/404.html'),
      controller: 'ErrorController',
      resolve: {
          // cause a 1 second delay
        delay: utils.delayLoad
      }
    })
    .when('/notes', {
      template: require('./notes/notes.html'),
      controller: 'NotesController',
      resolve: {
          // cause a 1 second delay
        delay: utils.delayLoad,
        keyword: utils.keywordCheck
      }
    })
    .when('/notes/new', {
      template: require('./notes/new-edit/note.html'),
      controller: 'NewNoteController',
      resolve: {
          // cause a 1 second delay
        delay: utils.delayLoad,
        keyword: utils.keywordCheck
      }
    })
    .when('/notes/edit/:id', {
      template: require('./notes/new-edit/note.html'),
      controller: 'EditNoteController',
      resolve: {
          // cause a 1 second delay
        delay: utils.delayLoad,
        keyword: utils.keywordCheck
      }
    })

    // otherwise route
  $routeProvider.otherwise('/404')
    // configure html5
  $locationProvider.html5Mode(angular.element('#appData').data('html5mode'))
})
