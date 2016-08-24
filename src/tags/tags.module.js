'use strict';

require('./*/*.controller.js', { mode: 'expand' });
require('./*/*/*.controller.js', { mode: 'expand' });

angular.module('app.tags',[
    require('angular-route'),
    'app.error',
    'app.notes'
]).
config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {redirectTo:'/notes'})
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
          delay: utils.delayLoad
        }
    })
    .when('/notes/new', {
        template: require('./notes/new-edit/note.html'),
        controller: 'NewNoteController',
        resolve: {
          // cause a 1 second delay
          delay: utils.delayLoad
        }
    })
    .when('/notes/edit:noteId', {
        template: require('./notes/new-edit/note.html'),
        controller: 'EditNoteController',
        resolve: {
          // cause a 1 second delay
          delay: utils.delayLoad
        }
    });

    //otherwise route
    $routeProvider.otherwise('/404');
    // configure html5
    $locationProvider.html5Mode(angular.element('#appData').data('html5mode'));
});
