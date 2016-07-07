(function() {

    angular.module('app.root.route',[require('angular-route')])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/', {
            template: require('../tags/home/home.html'),
            controller: 'HomeController',
            resolve: {
              // cause a 1 second delay
              delay: app.delayLoad
            }
        })
        .when('/404', {
            template: require('../tags/error/404.html'),
            controller: 'ErrorController',
            resolve: {
              // cause a 1 second delay
              delay: app.delayLoad
            }
        })
        .when('/grid', {
            template: require('../tags/grid/grid.html'),
            controller: 'GridController',
            resolve: {
              // cause a 1 second delay
              delay: app.delayLoad
            }
        });

        //otherwise route
        $routeProvider.otherwise('/404');
        // configure html5
        $locationProvider.html5Mode(angular.element('#appData').data('html5mode'));
    })
})();
