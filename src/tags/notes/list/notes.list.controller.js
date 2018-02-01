'use strict'

angular.module('app.notes')
    .controller('NotesListController', NotesListController)

function NotesListController ($rootScope, $scope, $q, $state, $translate, $timeout, Warehouse) {
  utils.delayView($rootScope, $q, $timeout)
  $scope.hub = Warehouse.getHub()
  $scope.options = {
    withSelector: true,
    withSearch: true,
    withDelete: true,
    getData: getItems,
    layout: {
      title: 'name',
      description: ['content', 'tags', 'created'],
      labels: {
        name: 'NOTES.NAME',
        tags: 'NOTES.TAGS',
        content: 'NOTES.CONTENT',
        created: 'NOTES.CREATED'
      },
      formats: {
        tags: 'tags',
        created: 'date'
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
      newItem: addItem,
      deleteItem: deleteItem,
      deleteItems: deleteItems,
      rowClick: editItem
    }
  }

  function editItem (data) {
    $state.go('notes.edit', { id: data.id })
  }

  function addItem (name) {
    $state.go('notes.new', { name: name })
  }

  function deleteItems (items) {
    var itemIds = _.map(items, 'id')
    if (itemIds.length > 0) {
      $rootScope.loading = true
      return Warehouse.deleteItems(itemIds).then(function (res) {
        return $rootScope.$broadcast('grid-reload')
      }).catch(function () {
        return $rootScope.$broadcast('grid-reload')
      })
    }
  }

  function deleteItem (item) {
    $rootScope.loading = true
    return Warehouse.deleteItems([item.id]).then(function () {
      return $rootScope.$broadcast('grid-reload')
    }).catch(function () {
      return $rootScope.$broadcast('grid-reload')
    })
  }

  function getItems () {
    $rootScope.loading = true
    return Warehouse.getItems().then(function (items) {
      items.forEach(function (item) {
        item.content = item.content.text
      })
      $rootScope.loading = false
      return items
    }).catch(function () {
      $state.go('hubs')
    })
  }
}
