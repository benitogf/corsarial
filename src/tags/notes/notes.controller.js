'use strict'

angular.module('app.notes', [])
    .controller('NotesController', NotesController)

function NotesController ($rootScope, $scope, $q, $location, $translate, Warehouse) {
  $scope.hub = Warehouse.getHub();
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
      }]
    },
    controllerAction: {
      editItem: editItem,
      newItem: addItem,
      deleteItems: deleteItems
    }
  }

  function editItem (data) {
    $location.path('/notes/edit/' + data.id)
  }

  function addItem (name) {
    $location.path('/notes/new').search({name: name})
  }

  function deleteItems (items) {
    var itemIds = _.map(items, 'id')
    Warehouse.deleteItems(itemIds)
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
