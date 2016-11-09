describe('Navigator', function () {
  var sidebar
  var element
  var scope
  var $rootScope
  var $compile
  beforeEach(function () {
    angular.mock.module('app.nav', mockUtils.mdSidenavProvider)
    angular.mock.module('app.nav', mockUtils.mdUtilProvider)
    angular.mock.module('app.nav', mockUtils.i18nServiceProvider)
    angular.mock.module('app.nav', mockUtils.translateProvider)
    angular.mock.module('app.nav', mockUtils.warehouseProvider)
    angular.mock.inject(function ($injector) {
      $rootScope = $injector.get('$rootScope')
      $compile = $injector.get('$compile')
    })
  })
  beforeEach(function () {
    scope = $rootScope.$new()
    element = angular.element('<md-nav></md-nav>')
    $compile(element)(scope)
    $rootScope.$digest()
    sidebar = element.scope()
  })
  it('should toggle', function () {
    sidebar.toggleLeft()
    expect(sidebar.isOpenLeft()).to.eq(true)
  })
  it('should close', function () {
    sidebar.toggleLeft()
    sidebar.toggleRight('preferences')
    sidebar.hide('left')
    sidebar.hide('right')
    expect(sidebar.isOpenLeft()).to.eq(false)
    expect(sidebar.isOpenRight()).to.eq(false)
  })
  it('should open', function () {
    sidebar.show('left')
    expect(sidebar.isOpenLeft()).to.eq(true)
  })
})
