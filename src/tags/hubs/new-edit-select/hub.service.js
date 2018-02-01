'use strict'

angular.module('app.hubs')
  .factory('HubService', HubService)

function HubService ($rootScope, $state, $q, $translate, $mdDialog, $mdToast, Warehouse) {
  return {
    showDialog: showDialog,
    showToast: showToast
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
      if ($scope.hubForm.$invalid) {
        $rootScope.$broadcast('show-form-errors')
      } else {
        switch (action) {
          case 'CREATE':
            return Warehouse.createHub($scope.hub.name, $scope.hub.keyword).then(function () {
              $state.go('notes')
              return $mdDialog.hide($translate.instant('HUB.CREATED'))
            }).catch(function (err) {
              showToast($translate.instant('HUB.NAME.DUPLICATED') + '[' + err + ']')
            })
          case 'SELECT':
            $scope.loading = true
            return Warehouse.selectHub($scope.hub.name, $scope.hub.keyword).then(function () {
              $state.go('notes')
              return $mdDialog.hide($translate.instant('HUB.SELECTED'))
            }).catch(function (err) {
              $scope.loading = false
              showToast($translate.instant('HUB.KEYWORD.WRONG') + '[' + err + ']')
            })
          case 'EDIT':
            $scope.loading = true
            return Warehouse.selectHub($scope.hub.name, $scope.hub.keyword).then(function () {
              return Warehouse.updateHub($scope.hub.name, $scope.hub.newName).then(function () {
                $rootScope.$broadcast('grid-reload')
                $scope.loading = false
                return $mdDialog.hide($translate.instant('HUB.UPDATED'))
              })
            }).catch(function (err) {
              $scope.loading = false
              showToast($translate.instant('HUB.KEYWORD.WRONG') + '[' + err + ']')
            })
          case 'DELETE':
            $scope.loading = true
            return Warehouse.selectHub($scope.hub.name, $scope.hub.keyword).then(function () {
              return Warehouse.deleteHub($scope.hub.name).then(function () {
                $rootScope.$broadcast('grid-reload')
                $scope.loading = false
                return $mdDialog.hide($translate.instant('HUB.DELETED'))
              })
            }).catch(function (err) {
              $scope.loading = false
              showToast($translate.instant('HUB.KEYWORD.WRONG') + '[' + err + ']')
            })
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
