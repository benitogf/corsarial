describe('Navigator right', function () {
  var nav
  var element
  var scope
  var $rootScope
  var $compile
  beforeEach(function () {
    angular.mock.module('app.nav', mockUtils.mdSidenavProvider)
    angular.mock.module('app.nav', mockUtils.mdUtilProvider)
    angular.mock.module('app.nav', mockUtils.i18nServiceProvider)
    angular.mock.module('app.nav', mockUtils.translateProvider)
    angular.mock.inject(function ($injector) {
      $rootScope = $injector.get('$rootScope')
      $compile = $injector.get('$compile')
    })
  })
  beforeEach(function () {
    scope = $rootScope.$new()
    element = angular.element('<nav-right></nav-right>')
    $compile(element)(scope)
    $rootScope.$digest()
    nav = element.scope()
  })
  it('should have a controller', function () {
    expect(nav.vm).to.be.an.instanceOf(Object)
  })
})
