describe('Hubs', function () {
  var $controller
  var $rootScope
  var scope
  beforeEach(function () {
    angular.mock.module('app.hubs')
    angular.mock.module('app.hubs', mockUtils.warehouseProvider)
    angular.mock.module('app.hubs', mockUtils.translateProvider)
    angular.mock.module('app.hubs', mockUtils.mdMediaProvider)
    angular.mock.module('app.hubs', mockUtils.mdDialogProvider)
    angular.mock.module('app.hubs', mockUtils.mdToastProvider)
    angular.mock.module('app.hubs', mockUtils.stateProvider)
    angular.mock.inject(function ($injector) {
      $rootScope = $injector.get('$rootScope')
      $controller = $injector.get('$controller')
    })
  })
  beforeEach(function () {
    scope = $rootScope.$new()
    $controller('HubsController', {
      $scope: scope
    })
  })
  it('should have a getData method', function () {
    expect(scope.options.getData).to.be.an.instanceOf(Function)
  })
  it('should have methods', function () {
    scope.options.getData()
    scope.createItem()
    scope.options.controllerAction.editItem({ id: '1' })
    scope.options.controllerAction.rowClick({ id: '1' })
    scope.options.controllerAction.rowClick({ id: '1', selected: true })
    scope.options.controllerAction.deleteItem({ id: '1' })
    expect(scope.options.controllerAction.deleteItem).to.be.an.instanceOf(Function)
    expect(scope.options.controllerAction.editItem).to.be.an.instanceOf(Function)
  })
})
