describe('Error', function () {
  var scope
  var controller
  var $controller
  var $rootScope
  beforeEach(function () {
    angular.mock.module('app.error')
    angular.mock.inject(function ($injector) {
      $rootScope = $injector.get('$rootScope')
      $controller = $injector.get('$controller')
    })
  })
  beforeEach(function () {
    scope = $rootScope.$new()
    controller = $controller('ErrorController', {
      $scope: scope
    })
  })
  it('should have a controller', function () {
    expect(controller).to.be.an.instanceOf(Object)
  })
})
