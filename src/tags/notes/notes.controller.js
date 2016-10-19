'use strict'

angular.module('app.notes', [])
    .controller('NotesController', NotesController)

function NotesController ($scope, $q, $location, $translate) {
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
      newItem: addItem
    }
  }

  function editItem (data) {
    $location.path('/notes/edit:' + data.id)
  }

  function addItem (name) {
    $location.path('/notes/new').search({name: name})
  }

  function getItems () {
    var items = [
      {
        'id': 'A01DB120438D226B48257B2C000BC2BB',
        'name': 'Hexcore strings',
        'tags': ['Accessories', 'Musical Instruments'],
        'content': 'This is the content of a note, is not too long so you can read it quickly and engage with more important activities',
        'created': 1459247899,
        'status': '0'
      },
      {
        'id': '1F59E627B5D56E9E48257B2C000BC2E2',
        'name': 'Silk strings',
        'tags': ['Accessories', 'Musical Instruments'],
        'content': 'This is the content of a note, is not too long so you can read it quickly and engage with more important activities',
        'created': 1459257093,
        'status': '0'
      },
      {
        'id': 'A58049C0A6A4C0FB48257B2C000BC34E',
        'name': 'Nickel-plated strings',
        'tags': ['Accessories', 'Musical Instruments'],
        'content': 'This is the content of a note, is not too long so you can read it quickly and engage with more important activities',
        'created': 1459241348,
        'status': '0'
      }
    ]
    return $q(function (resolve) {
      resolve(items)
    })
  }
}
