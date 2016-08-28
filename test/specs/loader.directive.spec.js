describe('Loader', function () {
  var loader
  var element
  var scope
  var $rootScope
  var $compile
  beforeEach(function () {
    angular.mock.module('mdLoader')
    angular.mock.inject(function ($injector) {
      $rootScope = $injector.get('$rootScope')
      $compile = $injector.get('$compile')
    })
  })
  beforeEach(function () {
    scope = $rootScope.$new()
    element = angular.element('<md-loader></md-loader>')
    $compile(element)(scope)
    $rootScope.$digest()
    loader = element.scope()
  })
  it('should have a controller', function () {
    expect(loader).to.be.an.instanceOf(Object)
  })
})
