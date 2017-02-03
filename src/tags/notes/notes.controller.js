'use strict'

angular.module('app.notes', [])
    .controller('NotesController', NotesController)

function NotesController ($rootScope, $scope, $q, $state, $translate, $timeout, Warehouse) {
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
    $state.go('note-edit', { id: data.id })
  }

  function addItem (name) {
    $state.go('note-new', { name: name })
  }

  function deleteItems (items) {
    var itemIds = _.map(items, 'id')
    Warehouse.deleteItems(itemIds)
    $rootScope.$broadcast('grid-reload')
  }

  function deleteItem (item) {
    Warehouse.deleteItems([item.id])
    $rootScope.$broadcast('grid-reload')
  }

  function getItems () {
    return $q(function (resolve) {
      var items = []
      Warehouse.getItems().forEach(function (item) {
        item.content = item.content.text
        items.push(item)
      })
      resolve(items)
    })
  }
}
