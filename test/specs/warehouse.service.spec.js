describe('Warehouse service', function () {
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
      wh = $injector.get('Warehouse')
    })
  })
  it('should set an item', function () {
    wh.removeItems(testKey, [testId, newTestId])
    var newItemId = wh.setItem(testKey, testItem)
    expect(newItemId).to.eq(testId)
  })
  it('should get an item', function () {
    var item = wh.getItem(testKey, testId)
    expect(item.id).to.eq(testId)
  })
  it('should modify an item', function () {
    var newItemId = wh.modifyItem(testKey, testId, newTestItem)
    var item = wh.getItem(testKey, testId)
    expect(newItemId).to.eq(newTestId)
    expect(item).to.eq(false)
  })
  it('should reject same name items', function () {
    var itemId = wh.setItem(testKey, newTestItem)
    var newItemId = wh.setItem(testKey, testItem)
    expect(itemId).to.eq(false)
    expect(newItemId).to.eq(testId)
  })
  it('should remove items', function () {
    wh.removeItems(testKey, [testId, newTestId])
    var item = wh.getItem(testKey, testId)
    expect(item).to.eq(false)
  })
})
