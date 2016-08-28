describe('Navigator toggle', function () {
  var toggle
  var element
  var scope
  var $rootScope
  var $compile
  beforeEach(function () {
    angular.mock.module('app.nav', mockUtils.mdUtilProvider)
    angular.mock.module('app.nav', mockUtils.timeoutProvider)
    angular.mock.inject(function ($injector) {
      $rootScope = $injector.get('$rootScope')
      $compile = $injector.get('$compile')
    })
  })
  beforeEach(function () {
    scope = $rootScope.$new()
    scope.section = { name: 'Test', children: [{ pages: [{ name: 'Nested Test' }] }] }
    element = angular.element('<nav-toggle section="section"></nav-toggle>')
    $compile(element)(scope)
    $rootScope.$digest()
    toggle = element.scope().$$childHead
  })
  it('should check the open section', function () {
    toggle.toggle()
    expect(toggle.getTargetHeight(toggle.menu)).to.eq('0px')
    expect(toggle.isOpen(scope.section)).to.eq(true)
  })
})
