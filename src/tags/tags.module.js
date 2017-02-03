'use strict'

require('./*/*.js', { mode: 'expand' })
require('./**/*.js', { mode: 'expand' })
// require('./*/*.js', { mode: 'expand' })
// require('./*/*/*.js', { mode: 'expand' })
// require('./*/*/*/*.js', { mode: 'expand' })

angular.module('app.tags', [
  'app.error',
  'app.hubs',
  'app.notes'
])
.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('hubs', {
      url: '/',
      template: require('./hubs/hubs.html'),
      controller: 'HubsController',
      resolve: {
        delay: utils.delayLoad
      }
    })
    .state('404', {
      url: '/404',
      template: require('./error/404.html'),
      controller: 'ErrorController',
      resolve: {
        delay: utils.delayLoad
      }
    })
    .state('notes', {
      section: '',
      url: '/notes',
      template: require('./notes/notes.html'),
      controller: 'NotesController',
      resolve: {
        profile: utils.keywordCheck,
        delay: utils.delayLoad
      }
    })
    .state('note-new', {
      url: '/note/new?name',
      template: require('./notes/new-edit/note.html'),
      controller: 'NewNoteController',
      resolve: {
          // cause a 1 second delay
        delay: utils.delayLoad,
        keyword: utils.keywordCheck
      }
    })
    .state('note-edit', {
      url: '/note/edit/:id',
      template: require('./notes/new-edit/note.html'),
      controller: 'EditNoteController',
      resolve: {
          // cause a 1 second delay
        delay: utils.delayLoad,
        keyword: utils.keywordCheck
      }
    })

  // otherwise route
  $urlRouterProvider.otherwise('/404')
  // configure html5
  $locationProvider.html5Mode(angular.element('#appData').data('html5mode'))
})
