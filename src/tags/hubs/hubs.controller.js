'use strict'

angular.module('app.hubs', [])
    .controller('HubsController', HubsController)

function HubsController ($rootScope, $scope, $q, $location, Warehouse, HubService) {
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
      createItem: createItem,
      editItem: editItem,
      deleteItem: deleteItem,
      rowClick: selectItem
    }
  }
  function createItem () {
    HubService.showDialog({
      name: '',
      keyword: ''
    }, 'CREATE')
  }
  function editItem (item) {
    HubService.showDialog({
      name: item.id,
      keyword: ''
    }, 'EDIT')
  }
  function selectItem (item) {
    if (item.selected) {
      $location.path('/notes')
    } else {
      HubService.showDialog({
        name: item.id,
        keyword: ''
      }, 'SELECT')
    }
  }
  function deleteItem (item) {
    HubService.showDialog({
      name: item.id,
      keyword: ''
    }, 'DELETE')
  }
  function getItems () {
    return $q(function (resolve) {
      resolve(Warehouse.getHubs())
    })
  }
}
