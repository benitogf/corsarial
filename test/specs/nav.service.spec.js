describe('Navigator service', function () {
  var nav
  beforeEach(function () {
    angular.mock.module('app.nav')
    angular.mock.inject(function ($injector) {
      nav = $injector.get('NavService')
    })
  })
  it('should get a nested page by url', function () {
    nav.getPageByUrl('/notes/list')
    expect(nav.selectedPage.url).to.eq('/notes/list')
  })
  it('should get a section page by url', function () {
    nav.getPageByUrl('/')
    expect(nav.selectedPage.url).to.eq('/')
  })
  it('should fail selecting a nonexistent page by url', function () {
    nav.getPageByUrl('/nonexistent')
    expect(nav.selectedPage).to.eq(null)
  })
  it('should select page and check page selected', function () {
    nav.selectPage('route', 'test')
    expect(nav.isPageSelected('test')).to.eq(true)
  })
  it('should set the open section', function () {
    nav.selectPage('route', 'test')
    expect(nav.openSection).to.eq('route')
  })
  it('should set the selected page', function () {
    nav.selectPage('route', 'test')
    expect(nav.selectedPage).to.eq('test')
  })
  it('should toggle section with same as current to null', function () {
    nav.openSection = 'route'
    nav.toggleOpenSection('route')
    expect(nav.isSectionOpen('route')).to.eq(false)
  })
  it('should toggle section to a new value', function () {
    nav.openSection = 'home'
    nav.toggleOpenSection('route')
    expect(nav.isSectionOpen('route')).to.eq(true)
  })
})
