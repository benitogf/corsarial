(function() {

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

  function mdDataGridController($scope) {

      var vm = this;

      vm.options.getData().then(function(data){
        $scope.items = data;
        $scope.selected = [];
        $scope.rowClick = vm.options.controllerAction.rowClick;
      });

      $scope.toggleFilters = toggleFilters;

      $scope.toggle = toggle;
      $scope.exists = exists;
      $scope.isIndeterminate = isIndeterminate;
      $scope.isChecked = isChecked;
      $scope.toggleAll = toggleAll;

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
        return ($scope.selected.length !== 0 &&
            $scope.selected.length !== $scope.items.length);
      }

      function toggleAll() {
        if ($scope.selected.length === $scope.items.length) {
          $scope.selected = [];
        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
          $scope.selected = $scope.items.slice(0);
        }
      }

      function isChecked() {
        return $scope.selected.length === $scope.items.length;
      }

      function toggleFilters() {
        $scope.showFilters = !$scope.showFilters;
      }
  }

  return directive;
}
})();
