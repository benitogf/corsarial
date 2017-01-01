'use strict'

angular.module('mdGrid', [])
.directive('mdGrid', mdGrid)
.filter('mdGridFilter', mdGridFilter)

function mdGrid () {
  var directive = {
    bindToController: true,
    controller: MdGridController,
    restrict: 'E',
    scope: {
      options: '=', // pass options for customization @required
      selected: '=?' // pass a model for the selected items
    },
    template: require('./md-grid.html')
  }

  function MdGridController ($rootScope, $scope, $q, $timeout, $translate, $mdToast, moment, FORMATS) {
    this.$onInit = function () {
      $scope.options = $scope.$parent.options
      $scope.createItem = $scope.options.controllerAction.createItem
      $scope.newItem = $scope.options.controllerAction.newItem
      $scope.deleteItems = $scope.options.controllerAction.deleteItems
      $scope.rowClick = $scope.options.controllerAction.rowClick || toggle
      $scope.allFields = _.union([$scope.options.layout.title], $scope.options.layout.description)
      $scope.getData = $scope.options.getData

      $scope.filters = []
      $scope.search = {}
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

      $scope.$on('grid-reload', function () {
        activate()
      })

      activate()
    }

    function activate () {
      $rootScope.loading = true
      $scope.getData().then(function (data) {
        $scope.items = data
        $scope.selected = $scope.selected || []
        $scope.search.field = $scope.options.layout.title
        $scope.sortOrder = 'asc'
        $rootScope.loading = false
      })
    }

    function addFilter () {
      var newFilter = {
        order: $scope.sortOrder,
        field: $scope.search.field,
        format: $scope.options.layout.formats[$scope.search.field],
        label: $translate.instant($scope.options.layout.labels[$scope.search.field])
      }
      console.log($scope.search)
      switch (newFilter.format) {
        case 'date':
          newFilter.query = {
            from: $scope.dateFrom,
            to: $scope.dateTo
          }
          if ($scope.dateFrom && $scope.dateTo) {
            if ($scope.dateFrom === $scope.dateTo) {
              newFilter.label += ': ' + moment($scope.dateFrom).format(FORMATS.DATE)
            } else {
              newFilter.label += ': ' + moment($scope.dateFrom).format(FORMATS.DATE) + ' - ' + moment($scope.dateTo).format(FORMATS.DATE)
            }
          }
          break
        default:
          var fieldValue = getField($scope.selectedItem, $scope.search.field) || $scope.search.text
          if (fieldValue) {
            newFilter.label += ': ' + fieldValue
            newFilter.query = fieldValue
          }
      }
      var filterIndex = _.findIndex($scope.filters, ['field', $scope.search.field])
      if (filterIndex === -1) {
        $scope.filters.push(newFilter)
        $scope.search.text = ''
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
        results = $scope.items.filter(autocomplete(query))
      }
      var deferred = $q.defer()
      deferred.resolve(results)
      return deferred.promise
    }

    function autocomplete (query) {
      var lowercaseQuery = query.toLowerCase()
      return function filterFn (item) {
        return (getField(item, $scope.search.field).toLowerCase().indexOf(lowercaseQuery) !== -1)
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
      delete $scope.selectedItem
    }

    function changeDateFrom () {
      $scope.dateTo = $scope.dateFrom
    }

    function toggle (item) {
      var idx = $scope.selected.indexOf(item)
      if (idx > -1) {
        $scope.selected.splice(idx, 1)
      } else {
        $scope.selected.push(item)
      }
    }

    function exists (item) {
      return $scope.selected.indexOf(item) > -1
    }

    function isIndeterminate () {
      return $scope.selected && ($scope.selected.length !== 0 &&
            $scope.selected.length !== $scope.items.length)
    }

    function toggleAll () {
      if (allChecked()) {
        $scope.selected = []
      } else {
        $scope.selected = $scope.items.slice(0)
      }
    }

    function allChecked () {
      return $scope.selected && $scope.selected.length === $scope.items.length
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
