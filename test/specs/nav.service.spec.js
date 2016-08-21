describe('Route navigator service', function() {
    var nav;
    beforeEach(function () {
        angular.mock.module('nav.service', mockUtils.translateProvider);
        angular.mock.module('nav.service');
        angular.mock.inject(function ($injector) {
          nav = $injector.get('NavService');
        });
    });
    it('should select page and check page selected', function () {
        nav.selectPage('route', 'test');
        expect(nav.isPageSelected('test')).to.eq(true);
    });
    it('should set the open section', function () {
        nav.selectPage('route', 'test');
        expect(nav.openSection).to.eq('route');
    });
    it('should set the selected page', function () {
        nav.selectPage('route', 'test');
        expect(nav.selectedPage).to.eq('test');
    });
    it('should toggle section with same as current to null', function () {
        nav.openSection = 'route';
        nav.toggleOpenSection('route');
        expect(nav.isSectionOpen('route')).to.eq(false);
    });
    it('should toggle section to a new value', function () {
        nav.openSection = 'home';
        nav.toggleOpenSection('route');
        expect(nav.isSectionOpen('route')).to.eq(true);
    });
});
