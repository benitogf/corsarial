describe('Quill', function () {
  var form
  var element
  var scope
  var $rootScope
  var $compile
  beforeEach(function () {
    angular.mock.module('mdQuill')
    angular.mock.inject(function ($injector) {
      $rootScope = $injector.get('$rootScope')
      $compile = $injector.get('$compile')
    })
  })
  beforeEach(function () {
    scope = $rootScope.$new()
    scope.testModel = {
      text: '',
      contents: []
    }
    element = angular.element('<form name="testForm">' +
                                '<md-input-container md-form-error>' +
                                  '<md-quill ng-model="testModel" name="testInput" maxlength="200" required></md-quill>' +
                                '</md-input-container>' +
                              '</form>')
    $compile(element)(scope)
    $rootScope.$digest()
    form = element.scope()
  })
  it('should validate required attribute', function () {
    $rootScope.$broadcast('show-form-errors')
    $rootScope.$digest()
    expect(form.testForm.$valid).to.eq(false)
  })
  it('should update text', function () {
    var quill = scope.$$childHead.quill
    quill.setContents([
      {insert: 'Test'}
    ])
    expect(scope.testModel.text).to.eq('Test\n')
  })
  it('should set empty on line returns', function () {
    var quill = scope.$$childHead.quill
    quill.setContents([
      {insert: '\n'},
      {insert: '\n'},
      {insert: '\n'}
    ])
    expect(scope.testModel.text).to.eq('')
  })
})
