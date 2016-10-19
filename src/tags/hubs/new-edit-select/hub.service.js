'use strict'

angular.module('app.hubs')
  .factory('HubService', HubService)

function HubService ($rootScope, $location, $q, $mdDialog, $mdToast, Warehouse) {
  return {
    showDialog: showDialog
  }

  function dialogControl ($scope, $translate, $mdDialog, item, action) {
    $scope.submit = submit
    $scope.hub = item
    $scope.action = action
    $scope.disabledName = (action !== 'CREATE')

    function submit () {
      var status = false
      if ($scope.hubForm.$invalid) {
        $rootScope.$broadcast('show-form-errors')
      } else {
        switch (action) {
          case 'CREATE':
            status = Warehouse.createHub($scope.hub.name, $scope.hub.keyword)
            if (status) {
              $location.path('/notes')
              $mdDialog.hide($translate.instant('HUB.CREATED'))
            } else {
              showToast($translate.instant('HUB.NAME.DUPLICATED'))
            }
            break
          case 'SELECT':
            status = Warehouse.selectHub($scope.hub.name, $scope.hub.keyword)
            if (status) {
              $location.path('/notes')
              $mdDialog.hide($translate.instant('HUB.SELECTED'))
            } else {
              showToast($translate.instant('HUB.KEYWORD.WRONG'))
            }
            break
          case 'EDIT':
            status = Warehouse.selectHub($scope.hub.name, $scope.hub.keyword)
            if (status) {
              Warehouse.updateHub($scope.hub.name, $scope.hub.newName)
              $rootScope.$broadcast('grid-reload')
              $mdDialog.hide($translate.instant('HUB.UPDATED'))
            } else {
              showToast($translate.instant('HUB.KEYWORD.WRONG'))
            }
            break
          case 'DELETE':
            status = Warehouse.selectHub($scope.hub.name, $scope.hub.keyword)
            if (status) {
              Warehouse.deleteHub($scope.hub.name)
              $rootScope.$broadcast('grid-reload')
              $mdDialog.hide($translate.instant('HUB.DELETED'))
            } else {
              showToast($translate.instant('HUB.KEYWORD.WRONG'))
            }
            break
        }
      }
    }

    $scope.hide = function () {
      $mdDialog.hide()
    }

    $scope.cancel = function () {
      $mdDialog.cancel()
    }

    $scope.answer = function (answer) {
      $mdDialog.hide(answer)
    }
  }

  function showDialog (item, action) {
    $mdDialog.show({
      controller: dialogControl,
      template: require('./hub.html'),
      parent: angular.element(document.body),
      locals: {
        item: item,
        action: action
      },
      clickOutsideToClose: false,
      fullscreen: false // Only for -xs, -sm breakpoints.
    })
    .then(showToast)
  }

  function showToast (message) {
    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .position('bottom right')
        .hideDelay(3000)
    )
  }
}
