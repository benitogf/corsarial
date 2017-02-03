describe('Data grid', function () {
  var grid
  var element
  var scope
  var $rootScope
  var $compile
  var options = {
    layout: {
      title: 'name',
      description: ['tags', 'content'],
      labels: {
        name: 'NAME',
        tags: 'TAGS',
        content: 'CONTENT',
        created: 'CREATED'
      },
      formats: {
        tags: 'tags',
        created: 'date'
      }
    }
  }
  var items = [
    {
      name: 'isoscesles',
      content: 'A triangle',
      tags: ['triangle', 'not a square'],
      created: 1
    },
    {
      name: 'cube',
      content: 'A poligon',
      tags: ['poligon'],
      created: 2
    }
  ]
  var $q
  beforeEach(function () {
    angular.mock.module('mdGrid')
    angular.mock.module('mdGrid', mockUtils.i18nServiceProvider)
    angular.mock.module('mdGrid', mockUtils.translateProvider)
    angular.mock.module('mdGrid', mockUtils.mdToastProvider)
    angular.mock.module('mdGrid', mockUtils.momentProvider)
    angular.mock.module('mdGrid', mockUtils.formatsProvider)
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
    element = angular.element('<md-grid options="options"></md-grid>')
    $compile(element)(scope)
    $rootScope.$digest()
    grid = element.isolateScope()
  })
  it('should be in descendent order', function () {
    expect(grid.sortOrder).to.eq('asc')
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
    $rootScope.$broadcast('grid-reload')
    expect(grid.selected.length).to.eq(items.length)
  })
  it('should deselect all items', function () {
    grid.toggleAll()
    grid.toggleAll()
    expect(grid.selected.length).to.eq(0)
  })
  it('should find an item', function () {
    grid.querySearch('cub').then(function (res) {
      expect(grid.querySearch('cub')).to.eq(items[1])
    })
  })
  it('should filter list by array or text field', function () {
    grid.changeFilterField()
    grid.selectedItem = items[0]
    grid.search.field = 'tags'
    grid.search.text = 'tri'
    grid.addFilter()
    $rootScope.$digest()
    grid.selectedItem = null
    grid.search.field = 'content'
    grid.search.text = 'tri'
    grid.addFilter()
    $rootScope.$digest()
    expect(grid.filters[0].field).to.eq('tags')
  })
  it('should filter list by date field', function () {
    grid.search.field = 'created'
    grid.addFilter()
    $rootScope.$digest()
    grid.dateFrom = 1
    grid.changeDateFrom()
    grid.addFilter()
    $rootScope.$digest()
    grid.dateFrom = 1
    grid.dateTo = 2
    grid.addFilter()
    $rootScope.$digest()
    expect(grid.filters[0].field).to.eq('created')
  })
})
