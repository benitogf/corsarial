describe('Notes', function () {
  var $controller
  var $rootScope
  var scope
  beforeEach(function () {
    angular.mock.module('app.notes')
    angular.mock.module('app.notes', mockUtils.warehouseProvider)
    angular.mock.module('app.notes', mockUtils.translateProvider)
    angular.mock.module('app.notes', mockUtils.stateProvider)
    angular.mock.inject(function ($injector) {
      $rootScope = $injector.get('$rootScope')
      $controller = $injector.get('$controller')
    })
  })
  beforeEach(function () {
    scope = $rootScope.$new()
    $controller('NotesController', {
      $scope: scope
    })
  })
  it('should have a getData method', function () {
    expect(scope.options.getData).to.be.an.instanceOf(Function)
  })
  it('should have methods', function () {
    scope.options.getData()
    scope.options.controllerAction.newItem({ id: '1' })
    scope.options.controllerAction.editItem({ id: '1' })
    scope.options.controllerAction.deleteItem({ id: '1' })
    scope.options.controllerAction.deleteItems([])
    expect(scope.options.controllerAction.newItem).to.be.an.instanceOf(Function)
    expect(scope.options.controllerAction.editItem).to.be.an.instanceOf(Function)
  })
})
