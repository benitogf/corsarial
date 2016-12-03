'use strict'

require('./*/*.js', { mode: 'expand' })
require('./*/*/*.js', { mode: 'expand' })
require('./*/*/*/*.js', { mode: 'expand' })

angular.module('app.tags', [
  require('angular-ui-router'),
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
        profile: utils.keywordCheck,
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
    // .state('inspections-view.instructions', {
    //   section: 'INSPECTIONS.VIEW',
    //   url: '/inspections/view/:id/inspections',
    //   template: require('./inspections/view/instructions/view-instructions.html'),
    //   controller: 'InspectionsViewInstructionsController',
    //   resolve: {
    //     profile: utils.authCheck,
    //     delay: utils.delayLoad
    //   }
    // })
    // .state('inspections-report', {
    //   abstract: true,
    //   template: '<ui-view></ui-view>'
    // })
    // .state('inspections-report.summary', {
    //   section: 'INSPECTIONS.REPORT',
    //   url: '/inspections/report/:id/summary',
    //   template: require('./inspections/report/summary/report-summary.html'),
    //   controller: 'InspectionsReportSummaryController',
    //   resolve: {
    //     profile: utils.authCheck,
    //     delay: utils.delayLoad
    //   }
    // })
    // .state('inspections-report.standard', {
    //   section: 'INSPECTIONS.REPORT',
    //   url: '/inspections/report/:id/standard',
    //   template: require('./inspections/report/standard/report-standard.html'),
    //   controller: 'InspectionsReportStandardController',
    //   resolve: {
    //     profile: utils.authCheck,
    //     delay: utils.delayLoad
    //   }
    // })

    // otherwise route
  $urlRouterProvider.otherwise('/404')
    // configure html5
  $locationProvider.html5Mode(angular.element('#appData').data('html5mode'))
})
.run(function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state
  $rootScope.$stateParams = $stateParams
  $rootScope.$on('$stateChangeStart', function (evt, to, params) {
    if (to.redirectTo) {
      evt.preventDefault()
      $state.go(to.redirectTo, params, {location: 'replace'})
    }
  })
})
