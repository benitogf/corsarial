'use strict'

angular.module('app.hubs')
  .factory('HubService', HubService)

function HubService ($rootScope, $state, $q, $translate, $mdDialog, $mdToast, Warehouse) {
  return {
    showDialog: showDialog
  }

  function dialogControl ($scope, $timeout, item, action) {
    $scope.submit = submit
    $scope.hub = item
    $scope.action = action
    $scope.disabledName = (action !== 'CREATE')
    $scope.loading = true
    $timeout(function () {
      $scope.loading = false
    }, 1000)

    function submit () {
      var status = false
      if ($scope.hubForm.$invalid) {
        $rootScope.$broadcast('show-form-errors')
      } else {
        switch (action) {
          case 'CREATE':
            status = Warehouse.createHub($scope.hub.name, $scope.hub.keyword)
            if (status) {
              $state.go('notes')
              $mdDialog.hide($translate.instant('HUB.CREATED'))
            } else {
              showToast($translate.instant('HUB.NAME.DUPLICATED'))
            }
            break
          case 'SELECT':
            status = Warehouse.selectHub($scope.hub.name, $scope.hub.keyword)
            if (status) {
              $state.go('notes')
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

  function showDialog (item, action, fullscreen) {
    return $mdDialog.show({
      controller: dialogControl,
      template: require('./hub.html'),
      parent: angular.element(document.body),
      locals: {
        item: item,
        action: action
      },
      clickOutsideToClose: false,
      fullscreen: fullscreen // Only for -xs, -sm breakpoints.
    })
    .then(showToast)
  }

  function showToast (message) {
    return $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .position('bottom right')
        .hideDelay(3000)
    )
  }
}
