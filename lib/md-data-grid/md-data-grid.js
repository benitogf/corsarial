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

    vm.options.getData().then(function (data) {
      vm.items = data
      vm.selected = $scope.selected || []
      vm.filterFields = _.union([vm.options.shownFields.title], vm.options.shownFields.description)
      vm.filterField = vm.options.shownFields.title
      vm.sortOrder = 'DSC'
      $scope.editItem = vm.options.controllerAction.editItem
      $scope.newItem = vm.options.controllerAction.newItem
    })

    $scope.toggle = toggle
    $scope.exists = exists
    $scope.isIndeterminate = isIndeterminate
    $scope.allChecked = allChecked
    $scope.toggleAll = toggleAll
    $scope.querySearch = querySearch

    function querySearch (query) {
      var results = query ? vm.items.filter(createFilterFor(query)) : false
      var deferred = $q.defer()
      $timeout(function () { deferred.resolve(results) }, Math.random() * 1000, false)
      return deferred.promise
    }

    function createFilterFor (query) {
      var lowercaseQuery = query.toLowerCase()
      return function filterFn (item) {
        if (vm.filterField) {
          return (item[vm.filterField].toLowerCase().indexOf(lowercaseQuery) !== -1)
        } else {
          return (item[vm.options.shownFields.title].toLowerCase().indexOf(lowercaseQuery) !== -1)
        }
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
