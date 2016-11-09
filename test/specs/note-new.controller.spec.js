describe('Notes: new', function () {
  var $controller
  var $rootScope
  var scope
  beforeEach(function () {
    angular.mock.module('app.nav', mockUtils.warehouseProvider)
    angular.mock.module('app.notes', mockUtils.routeParamsProvider)
    angular.mock.inject(function ($injector) {
      $rootScope = $injector.get('$rootScope')
      $controller = $injector.get('$controller')
    })
  })
  beforeEach(function () {
    scope = $rootScope.$new()
    $controller('NewNoteController', {
      $scope: scope
    })
  })
  it('should have a saveNote method', function () {
    expect(scope.saveNote).to.be.an.instanceOf(Function)
  })
  it('should validate', function () {
    scope.noteForm = {
      $invalid: true
    }
    expect(scope.saveNote()).to.eq(false)
    scope.noteForm.$invalid = false
    expect(scope.saveNote()).to.eq(true)
  })
})
