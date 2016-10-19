'use strict'

angular.module('mdDataGrid', [])
.directive('mdDataGrid', mdDataGrid)

function mdDataGrid () {
  var directive = {
    bindToController: true,
    controller: MdDataGridController,
    controllerAs: 'vm',
    restrict: 'EA',
    scope: {
      options: '=', // pass options for customization @required
      selected: '=?' // pass a model for the selected items
    },
    template: require('./md-data-grid.html')
  }

  function MdDataGridController ($scope, $q, $timeout) {
    var vm = this

    $scope.createItem = vm.options.controllerAction.createItem
    $scope.editItem = vm.options.controllerAction.editItem
    $scope.newItem = vm.options.controllerAction.newItem
    $scope.deleteItems = vm.options.controllerAction.deleteItems
    $scope.rowClick = vm.options.controllerAction.rowClick || toggle
    $scope.allFields = _.union([vm.options.layout.title], vm.options.layout.description)

    $scope.toggle = toggle
    $scope.exists = exists
    $scope.isIndeterminate = isIndeterminate
    $scope.allChecked = allChecked
    $scope.toggleAll = toggleAll
    $scope.querySearch = querySearch

    activate()

    $scope.$on('grid-reload', function () {
      activate()
    })

    function activate () {
      vm.options.getData().then(function (data) {
        vm.items = data
        vm.selected = $scope.selected || []
        vm.filterField = vm.options.layout.title
        vm.sortOrder = 'DSC'
      })
    }

    function querySearch (query) {
      var results = false
      if (query) {
        results = vm.items.filter(createFilterFor(query))
      }
      var deferred = $q.defer()
      deferred.resolve(results)
      return deferred.promise
    }

    function createFilterFor (query) {
      var lowercaseQuery = query.toLowerCase()
      return function filterFn (item) {
        return (getField(item, vm.filterField).toLowerCase().indexOf(lowercaseQuery) !== -1)
      }
    }

    function getField (item, pos) {
      if (Array.isArray(item[pos])) {
        return item[pos].join(', ')
      } else {
        return item[pos]
      }
    }

    function toggle (item) {
      var idx = vm.selected.indexOf(item)
      if (idx > -1) {
        vm.selected.splice(idx, 1)
      } else {
        vm.selected.push(item)
      }
    }

    function exists (item) {
      return vm.selected.indexOf(item) > -1
    }

    function isIndeterminate () {
      return (vm.selected.length !== 0 &&
            vm.selected.length !== vm.items.length)
    }

    function toggleAll () {
      if (allChecked()) {
        vm.selected = []
      } else {
        vm.selected = vm.items.slice(0)
      }
    }

    function allChecked () {
      return vm.selected.length === vm.items.length
    }
  }

  return directive
}
