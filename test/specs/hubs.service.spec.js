describe('Hubs service', function () {
  var hubs
  beforeEach(function () {
    angular.mock.module('app.hubs')
    angular.mock.module('app.hubs', mockUtils.mdToastProvider)
    angular.mock.module('app.hubs', mockUtils.mdDialogProvider)
    angular.mock.module('app.hubs', mockUtils.warehouseProvider)
    angular.mock.inject(function ($injector) {
      hubs = $injector.get('HubService')
    })
  })
  it('should have a showDialog method', function () {
    expect(hubs.showDialog).to.be.an.instanceOf(Function)
  })
})
