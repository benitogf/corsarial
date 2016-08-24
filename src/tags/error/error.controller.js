'use strict';

angular.module('app.error',[])
.controller('ErrorController', ErrorController);

function ErrorController($scope, NavService, $log) {
    $log.warn('url not found');
    $scope.homeUrl = angular.element('#appData').data('preurl') + '/';
}
