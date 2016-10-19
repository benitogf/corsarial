describe('Notes', function () {
  var $controller
  var $rootScope
  var scope
  beforeEach(function () {
    angular.mock.module('app.notes')
    angular.mock.module('app.notes', mockUtils.translateProvider)
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
  it('should have new and edit methods', function () {
    scope.options.controllerAction.newItem({ id: '1' })
    scope.options.controllerAction.editItem({ id: '1' })
    expect(scope.options.controllerAction.newItem).to.be.an.instanceOf(Function)
    expect(scope.options.controllerAction.editItem).to.be.an.instanceOf(Function)
  })
})
