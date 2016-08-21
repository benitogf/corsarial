'use strict'

angular.module('mdDataGrid',[])
.directive('mdDataGrid', mdDataGrid);

function mdDataGrid(){
  var directive = {
      bindToController: true,
      controller: mdDataGridController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
          options: '=',// pass options for customization @required
          selected: '=?',// pass a model for the selected items
      },
      template: require('./md-data-grid.html'),
  };

  function mdDataGridController($scope, $q, $timeout) {

      var vm = this;

      vm.options.getData().then(function(data){
        vm.items = data;
        vm.selected = $scope.selected || [];
        vm.filterFields = _.union([vm.options.shownFields.title], vm.options.shownFields.description);
        vm.filterField = vm.options.shownFields.title;
        vm.sortOrder = 'DSC';
        $scope.editItem = vm.options.controllerAction.editItem;
        $scope.newItem = vm.options.controllerAction.newItem;
      });

      $scope.toggleFilters = toggleFilters;
      $scope.toggle = toggle;
      $scope.exists = exists;
      $scope.isIndeterminate = isIndeterminate;
      $scope.isChecked = isChecked;
      $scope.toggleAll = toggleAll;
      $scope.querySearch = querySearch;

      function querySearch (query) {
        var results = query ? vm.items.filter( createFilterFor(query) ) : false,
            deferred;
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      }

      function createFilterFor(query) {
        var lowercaseQuery = query.toLowerCase();
        return function filterFn(item) {
            if (vm.filterField) {
                return (item[vm.filterField].toLowerCase().indexOf(lowercaseQuery) !== -1);
            } else {
                return (item[vm.options.shownFields.title].toLowerCase().indexOf(lowercaseQuery) !== -1);
            }

        };
      }

      function toggle(item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
          list.splice(idx, 1);
        }
        else {
          list.push(item);
        }
      }

      function exists(item, list) {
        return list.indexOf(item) > -1;
      }

      function isIndeterminate() {
        return (vm.selected.length !== 0 &&
            vm.selected.length !== vm.items.length);
      }

      function toggleAll() {
        if (vm.selected.length === vm.items.length) {
          vm.selected = [];
      } else if (vm.selected.length === 0 || vm.selected.length > 0) {
          vm.selected = vm.items.slice(0);
        }
      }

      function isChecked() {
        return vm.selected.length === vm.items.length;
      }

      function toggleFilters() {
        $scope.showFilters = !$scope.showFilters;
      }
  }

  return directive;
}
