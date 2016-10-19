describe('Data grid', function () {
  var grid
  var element
  var scope
  var $rootScope
  var $compile
  var options = {
    layout: {
      title: 'name',
      description: ['content']
    }
  }
  var items = [
    {
      name: 'isoscesles',
      content: 'A triangle'
    },
    {
      name: 'cube',
      content: 'A poligon'
    }
  ]
  var $q
  beforeEach(function () {
    angular.mock.module('mdDataGrid')
    angular.mock.inject(function ($injector) {
      $rootScope = $injector.get('$rootScope')
      $compile = $injector.get('$compile')
      $q = $injector.get('$q')
    })
  })
  beforeEach(function () {
    options.getData = function () {
      return $q(function (resolve) {
        resolve(items)
      })
    }
    options.controllerAction = {
      editItem: function () {},
      newItem: function () {}
    }
    scope = $rootScope.$new()
    scope.options = options
    element = angular.element('<md-data-grid options="options"></md-data-grid>')
    $compile(element)(scope)
    $rootScope.$digest()
    grid = element.isolateScope()
  })
  it('should be in descendent order', function () {
    expect(grid.vm.sortOrder).to.eq('DSC')
  })
  it('should select an item', function () {
    grid.toggle(items[0])
    expect(grid.exists(items[0])).to.eq(true)
    expect(grid.isIndeterminate()).to.eq(true)
  })
  it('should deselect an item', function () {
    grid.toggle(items[0])
    grid.toggle(items[0])
    expect(grid.exists(items[0])).to.eq(false)
  })
  it('should select all items', function () {
    grid.toggleAll()
    expect(grid.vm.selected.length).to.eq(items.length)
  })
  it('should deselect all items', function () {
    grid.toggleAll()
    grid.toggleAll()
    expect(grid.vm.selected.length).to.eq(0)
  })
  it('should find an item', function () {
    grid.querySearch('cub').then(function (res) {
      expect(grid.querySearch('cub')).to.eq(items[1])
    })
  })
})
