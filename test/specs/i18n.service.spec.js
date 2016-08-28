describe('i18n service', function () {
  var i18n
  beforeEach(function () {
    angular.mock.module('i18n')
    angular.mock.inject(function ($injector) {
      i18n = $injector.get('i18nService')
    })
  })
  it('should get a list of languages', function () {
    expect(i18n.languages).to.be.an.instanceOf(Array)
  })
})
