describe('Navigator left', function () {
  var nav
  var element
  var scope
  var $rootScope
  var $compile
  beforeEach(function () {
    angular.mock.module('app.nav', mockUtils.mdUtilProvider)
    angular.mock.module('app.nav', mockUtils.mdSidenavProvider)
    angular.mock.module('app.nav', mockUtils.warehouseProvider)
    angular.mock.inject(function ($injector) {
      $rootScope = $injector.get('$rootScope')
      $compile = $injector.get('$compile')
    })
  })
  beforeEach(function () {
    scope = $rootScope.$new()
    element = angular.element('<nav-left></nav-left>')
    $compile(element)(scope)
    $rootScope.$digest()
    nav = element.scope()
  })
  it('should have a controller', function () {
    nav.close()
    expect(nav).to.be.an.instanceOf(Object)
  })
  it('should check the open section', function () {
    var testPage = { name: 'Test', children: [] }
    nav.nav.selectPage(testPage)
    expect(nav.isSectionOpen(testPage)).to.eq(true)
  })
  it('should check a nested open section', function () {
    $rootScope.$broadcast('$routeChangeSuccess')
    var testPage = { name: 'Test', children: [{ pages: [{ name: 'Nested Test' }] }] }
    nav.nav.selectPage(testPage.children[0])
    expect(nav.isSectionOpen(testPage)).to.eq(true)
  })
})
