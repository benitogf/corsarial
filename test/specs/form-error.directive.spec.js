describe('Form error', function () {
  var form
  var element
  var scope
  var $rootScope
  var $compile
  beforeEach(function () {
    angular.mock.module('mdFormError')
    angular.mock.inject(function ($injector) {
      $rootScope = $injector.get('$rootScope')
      $compile = $injector.get('$compile')
    })
  })
  beforeEach(function () {
    scope = $rootScope.$new()
    element = angular.element('<form name="testForm">' +
                                '<md-input-container md-form-error>' +
                                  '<input value="" ng-model="testModel" name="testInput" required/>' +
                                '</md-input-container>' +
                              '</form>')
    $compile(element)(scope)
    $rootScope.$digest()
    form = element.scope()
  })
  it('should show form errors', function () {
    $rootScope.$broadcast('show-form-errors')
    $rootScope.$digest()
    expect(form.testForm.testInput.$touched).to.eq(true)
  })
})
