'use strict'

angular.module('app.hubs', [])
    .controller('HubsController', HubsController)

function HubsController ($rootScope, $scope, $q, $translate, $state, $timeout, $mdMedia, Warehouse, HubService) {
  var media = 'max-width: 700px'
  utils.delayView($rootScope, $q, $timeout)
  $scope.activeTab = 'hubs'
  $scope.createItem = createItem
  $scope.options = {
    withCreate: true,
    getData: getItems,
    layout: {
      title: 'id',
      description: ['updated', 'selected'],
      labels: {
        create: 'COMMON.CREATE',
        name: 'HUB.NAME',
        updated: 'HUB.UPDATED',
        selected: 'HUB.SELECTED'
      },
      formats: {
        created: 'date',
        updated: 'date',
        selected: 'check'
      },
      menu: [{
        label: 'COMMON.EDIT',
        action: 'editItem'
      },
      {
        label: 'COMMON.DELETE',
        action: 'deleteItem'
      }]
    },
    controllerAction: {
      editItem: editItem,
      deleteItem: deleteItem,
      rowClick: selectItem
    }
  }
  function createItem () {
    HubService.showDialog({
      name: '',
      keyword: ''
    }, 'CREATE', $mdMedia(media))
    .catch(function () {
      $scope.activeTab = 'hubs'
    })
  }
  function editItem (item) {
    HubService.showDialog({
      name: item.id,
      keyword: ''
    }, 'EDIT', $mdMedia(media))
    .catch(function () {
      $scope.activeTab = 'hubs'
    })
  }
  function selectItem (item) {
    if (item.selected) {
      $state.go('notes')
    } else {
      if (item.id !== 'public') {
        HubService.showDialog({
          name: item.id,
          keyword: ''
        }, 'SELECT', $mdMedia(media))
        .catch(function () {
          $scope.activeTab = 'hubs'
        })
      } else {
        $rootScope.loading = true
        return Warehouse.selectHub('public', 'public').then(function () {
          return $state.go('notes')
        }).catch(function () {
          HubService.showToast($translate.instant('HUB.KEYWORD.WRONG'))
        })
      }
    }
  }
  function deleteItem (item) {
    HubService.showDialog({
      name: item.id,
      keyword: ''
    }, 'DELETE', $mdMedia(media))
    .catch(function () {
      $scope.activeTab = 'hubs'
    })
  }
  function getItems () {
    var selected = Warehouse.getHub()
    return $q(function (resolve, reject) {
      Warehouse.getHubs().then(function (hubs) {
        if (_.map(hubs, 'id').indexOf('public') === -1) {
          Warehouse.createHub('public', 'public').then(function (moreHubs) {
            return Warehouse.getHubs().then(function (moreHubs) {
              moreHubs.forEach(function (hub) {
                hub.selected = selected === hub.id
              })
              resolve(moreHubs)
            })
          }).catch(reject)
        } else {
          hubs.forEach(function (hub) {
            hub.selected = selected === hub.id
          })
          resolve(hubs)
        }
      })
    })
  }
}
