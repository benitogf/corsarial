'use strict'

angular.module('mdGrid', [])
.directive('mdGrid', mdGrid)
.filter('mdGridFilter', mdGridFilter)

function mdGrid () {
  var directive = {
    bindToController: true,
    controller: MdGridController,
    controllerAs: 'vm',
    restrict: 'E',
    scope: {
      options: '=', // pass options for customization @required
      selected: '=?' // pass a model for the selected items
    },
    template: require('./md-grid.html')
  }

  function MdGridController ($rootScope, $scope, $q, $timeout, $translate, $mdToast, moment, FORMATS) {
    var vm = this

    $scope.createItem = vm.options.controllerAction.createItem
    $scope.editItem = vm.options.controllerAction.editItem
    $scope.newItem = vm.options.controllerAction.newItem
    $scope.deleteItems = vm.options.controllerAction.deleteItems
    $scope.rowClick = vm.options.controllerAction.rowClick || toggle
    $scope.allFields = _.union([vm.options.layout.title], vm.options.layout.description)
    $scope.dateFormat = FORMATS.DATE

    $scope.filters = []
    $scope.addFilter = addFilter
    $scope.toggle = toggle
    $scope.exists = exists
    $scope.isIndeterminate = isIndeterminate
    $scope.allChecked = allChecked
    $scope.toggleAll = toggleAll
    $scope.querySearch = querySearch
    $scope.getField = getField
    $scope.changeFilterField = changeFilterField
    $scope.changeDateFrom = changeDateFrom

    activate()

    $scope.$on('grid-reload', function () {
      activate()
    })

    function activate () {
      $rootScope.loading = true
      vm.options.getData().then(function (data) {
        vm.items = data
        vm.selected = $scope.selected || []
        vm.filterField = vm.options.layout.title
        vm.sortOrder = 'asc'
        $rootScope.loading = false
      })
    }

    function addFilter () {
      var newFilter = {
        order: vm.sortOrder,
        field: vm.filterField,
        format: vm.options.layout.formats[vm.filterField],
        label: $translate.instant(vm.options.layout.labels[vm.filterField])
      }
      switch (newFilter.format) {
        case 'date':
          newFilter.query = {
            from: vm.dateFrom,
            to: vm.dateTo
          }
          if (vm.dateFrom && vm.dateTo) {
            if (vm.dateFrom === vm.dateTo) {
              newFilter.label += ': ' + moment(vm.dateFrom).format(FORMATS.DATE)
            } else {
              newFilter.label += ': ' + moment(vm.dateFrom).format(FORMATS.DATE) + ' - ' + moment(vm.dateTo).format(FORMATS.DATE)
            }
          }
          break
        default:
          var fieldValue = getField(vm.selectedItem, vm.filterField) || vm.searchText
          if (fieldValue) {
            newFilter.label += ': ' + fieldValue
            newFilter.query = fieldValue
          }
      }
      var filterIndex = _.findIndex($scope.filters, ['field', vm.filterField])
      if (filterIndex === -1) {
        $scope.filters.push(newFilter)
        vm.searchText = ''
      } else {
        $scope.filters[filterIndex] = newFilter
        $mdToast.show(
          $mdToast.simple()
            .textContent($translate.instant('GRID.FILTER.UPDATED'))
            .position('bottom right')
            .hideDelay(3000)
        )
      }
    }

    function querySearch (query) {
      var results = false
      if (query) {
        results = vm.items.filter(autocomplete(query))
      }
      var deferred = $q.defer()
      deferred.resolve(results)
      return deferred.promise
    }

    function autocomplete (query) {
      var lowercaseQuery = query.toLowerCase()
      return function filterFn (item) {
        return (getField(item, vm.filterField).toLowerCase().indexOf(lowercaseQuery) !== -1)
      }
    }

    function getField (item, pos) {
      if (item) {
        if (Array.isArray(item[pos])) {
          return item[pos].join(', ')
        } else {
          return item[pos]
        }
      } else {
        return false
      }
    }

    function changeFilterField () {
      delete vm.selectedItem
    }

    function changeDateFrom () {
      vm.dateTo = vm.dateFrom
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
      return vm.selected && (vm.selected.length !== 0 &&
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
      return vm.selected && vm.selected.length === vm.items.length
    }
  }

  return directive
}

function mdGridFilter (moment) {
  function getText (field) {
    if (Array.isArray(field)) {
      return field.join(', ')
    } else {
      return field
    }
  }

  function filterItems (items, filters) {
    if (angular.isArray(items) && filters.length > 0) {
      filters.forEach(function (filter) {
        if (filter.query) {
          switch (filter.format) {
            case 'date':
              items = _.filter(items, function (o) { return _.inRange(o[filter.field], moment(filter.query.from).unix(), moment(filter.query.to).unix() + 86399) })
              break
            default:
              items = _.filter(items, function (o) { return getText(o[filter.field]).indexOf(filter.query) !== -1 })
          }
        }
      })

      items = _.orderBy(items, _.reverse(_.map(filters, 'field')), _.reverse(_.map(filters, 'order')))
    }
    return items
  }

  return filterItems
}
