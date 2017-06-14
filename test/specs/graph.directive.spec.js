describe('Graph', function () {
  var graph
  var element
  var scope
  var $rootScope
  var $compile
  beforeEach(function () {
    angular.mock.module('mdD3Graph')
    angular.mock.inject(function ($injector) {
      $rootScope = $injector.get('$rootScope')
      $compile = $injector.get('$compile')
    })
  })
  beforeEach(function () {
    scope = $rootScope.$new()
    element = angular.element('<md-d3-graph></md-d3-graph>')
    $compile(element)(scope)
    var canvas = element.find('canvas')[0]
    canvas.getContext = mockUtils.canvasGetCtx()
    $rootScope.$digest()
    graph = element.scope()
  })
  it('should have a controller', function () {
    expect(graph).to.be.an.instanceOf(Object)
  })
  it('should have a draw method', function () {
    expect(graph.draw).to.be.an.instanceOf(Function)
  })
  it('should draw', function () {
    graph.init()
    for (var i = 0; i < 50; i++) {
      graph.draw()
    }
    expect(graph.tick).to.eq(50)
  })
})
