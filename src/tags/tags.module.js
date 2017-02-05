'use strict'

require('./*/*.js', { mode: 'expand' })
require('./**/*.js', { mode: 'expand' })

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
    .state('notes.list', {
      section: '',
      url: '/list',
      template: require('./notes/list/notes-list.html'),
      controller: 'NotesListController',
      resolve: {
        profile: utils.keywordCheck,
        delay: utils.delayLoad
      }
    })
    .state('notes.new', {
      url: '/new?name',
      template: require('./notes/form/note-form.html'),
      controller: 'NotesNewController',
      resolve: {
          // cause a 1 second delay
        delay: utils.delayLoad,
        keyword: utils.keywordCheck
      }
    })
    .state('notes.edit', {
      url: '/edit/:id',
      template: require('./notes/form/note-form.html'),
      controller: 'NotesEditController',
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
