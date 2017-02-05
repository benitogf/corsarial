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
  it('should have a scope', function () {
    expect(scope).to.be.an.instanceOf(Object)
  })
})
