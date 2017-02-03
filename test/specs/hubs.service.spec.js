describe('Hubs service', function () {
  var hubs

  function checkDialog (action) {
    var newScope = {}
    hubs.showDialog({ id: 1 }, action, true).control(newScope, function (cb) { cb() }, {}, action)
    newScope.hubForm = { $invalid: false }
    newScope.hub = { name: true }
    newScope.submit()
    newScope.hubForm = { $invalid: false }
    newScope.hub = { name: false }
    newScope.submit()
    newScope.hubForm = { $invalid: true }
    newScope.submit()
    return newScope
  }

  beforeEach(function () {
    angular.mock.module('app.hubs')
    angular.mock.module('app.hubs', mockUtils.mdToastProvider)
    angular.mock.module('app.hubs', mockUtils.mdDialogProvider)
    angular.mock.module('mdGrid', mockUtils.translateProvider)
    angular.mock.module('app.hubs', mockUtils.warehouseProvider)
    angular.mock.module('app.notes', mockUtils.stateProvider)
    angular.mock.inject(function ($injector) {
      hubs = $injector.get('HubService')
    })
  })
  it('should have a showDialog method', function () {
    expect(hubs.showDialog).to.be.an.instanceOf(Function)
  })
  it('should submit create dialogs', function () {
    var newScope = checkDialog('CREATE')
    newScope.hide()
    newScope.cancel()
    newScope.answer()
    expect(hubs.showDialog).to.be.an.instanceOf(Function)
  })
  it('should submit select dialogs', function () {
    checkDialog('SELECT')
    expect(hubs.showDialog).to.be.an.instanceOf(Function)
  })
  it('should submit edit dialogs', function () {
    checkDialog('EDIT')
    expect(hubs.showDialog).to.be.an.instanceOf(Function)
  })
  it('should submit delete dialogs', function () {
    checkDialog('DELETE')
    expect(hubs.showDialog).to.be.an.instanceOf(Function)
  })
})
