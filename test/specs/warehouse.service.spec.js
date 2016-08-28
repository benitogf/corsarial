describe('Warehouse service', function () {
  var $rootScope
  var content = 'ふっかつ　あきる　すぶり　はやい　つける　まゆげ　たんさん　みんぞく　ねほりはほり　せまい　たいまつばな　ひはん'
  var testItem = {
    name: 'A test name',
    content: content
  }
  var newTestItem = {
    name: 'A new test name',
    content: content
  }
  var testKey = 'testnotes'
  var testId = '6e6a5910ea9537a7d02e44975f4765726c4a0237c7132d3ea4cf33be76ce678b'
  var newTestId = '3941b238daab168b5b742ef81603cd2c71fb83aa75b0a8044cc414561d7bf81a'
  var wh
  beforeEach(function () {
    angular.mock.module('warehouse')
    angular.mock.inject(function ($injector) {
      $rootScope = $injector.get('$rootScope')
      wh = $injector.get('Warehouse')
    })
  })
  it('should set an item', function () {
    wh.removeItems(testKey, [testId, newTestId])
    var newItemId = wh.setItem(testKey, testItem)
    expect(newItemId).to.eq(testId)
  })
  it('should fail to set an item with another keyword', function () {
    $rootScope.keyword = 'FakeKeyword'
    var item = wh.setItem(testKey, newTestItem)
    expect(item).to.eq(false)
  })
  it('should get an item', function () {
    var item = wh.getItem(testKey, testId)
    expect(item.id).to.eq(testId)
  })
  it('should fail to get an item with another keyword', function () {
    $rootScope.keyword = 'FakeKeyword'
    var item = wh.getItem(testKey, testId)
    expect(item).to.eq(false)
  })
  it('should fail to get an item with a nonexistent key', function () {
    var item = wh.getItem('FakeKey', testId)
    expect(item).to.eq(false)
  })
  it('should modify an item', function () {
    var newItemId = wh.modifyItem(testKey, testId, newTestItem)
    var item = wh.getItem(testKey, testId)
    expect(newItemId).to.eq(newTestId)
    expect(item).to.eq(false)
  })
  it('should fail to modify an item with another keyword', function () {
    $rootScope.keyword = 'FakeKeyword'
    var newItemId = wh.modifyItem(testKey, testId, newTestItem)
    expect(newItemId).to.eq(false)
  })
  it('should fail to modify in an nonexistent key', function () {
    var newItemId = wh.modifyItem('fakeKey', newTestId, newTestItem)
    expect(newItemId).to.eq(false)
  })
  it('should fail to modify a nonexistent item', function () {
    var newItemId = wh.modifyItem(testKey, 'fakeId', newTestItem)
    expect(newItemId).to.eq(false)
  })
  it('should reject same name items', function () {
    var sameItemId = wh.setItem(testKey, newTestItem)
    var itemId = wh.setItem(testKey, testItem)
    expect(sameItemId).to.eq(false)
    expect(itemId).to.eq(testId)
  })
  it('should fail to remove an item with another keyword', function () {
    $rootScope.keyword = 'FakeKeyword'
    wh.removeItems(testKey, [testId])
    delete $rootScope.keyword
    var item = wh.getItem(testKey, testId)
    expect(item.id).to.eq(testId)
  })
  it('should remove an item', function () {
    wh.removeItems(testKey, [testId])
    var item = wh.getItem(testKey, testId)
    expect(item).to.eq(false)
  })
  it('should remove items', function () {
    wh.setItem(testKey, newTestItem)
    wh.removeItems(testKey, [testId, newTestId])
    var item = wh.getItem(testKey, testId)
    var otherItem = wh.getItem(testKey, newTestId)
    expect(item).to.eq(false)
    expect(otherItem).to.eq(false)
  })
})
