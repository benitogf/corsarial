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
  var fakeItem = {
    name: 'A fake name',
    content: ''
  }
  var testHubKey = 'testHub'
  var newTestHubKey = 'newTestHub'
  var testKeyword = 'testKeyword1'
  var testId = '6e6a5910ea9537a7d02e44975f4765726c4a0237c7132d3ea4cf33be76ce678b'
  var newTestId = '3941b238daab168b5b742ef81603cd2c71fb83aa75b0a8044cc414561d7bf81a'
  var wh
  beforeEach(function () {
    angular.mock.module('warehouse')
    angular.mock.inject(function ($injector) {
      wh = $injector.get('Warehouse')
    })
  })
  it('should create a hub', function () {
    var status = wh.selectHub(testHubKey, testKeyword)
    if (status) {
      wh.deleteHub(testHubKey)
    }
    wh.createHub(testHubKey, testKeyword)
    var hubs = wh.getHubs()
    expect(_.map(hubs, 'id').indexOf(testHubKey)).to.not.be.eq(-1)
  })
  it('should fail to create the same hub', function () {
    var sameKey = wh.createHub(testHubKey, testKeyword)
    expect(sameKey).to.eq(false)
  })
  it('should get a list of hubs', function () {
    var hubs = wh.getHubs()
    expect(hubs).to.be.an.instanceOf(Array)
  })
  it('should set an item', function () {
    wh.deleteItems([testId, newTestId])
    var newItemId = wh.createItem(testItem)
    expect(newItemId).to.eq(testId)
  })
  it('should get an item', function () {
    var item = wh.getItem(testId)
    expect(item.id).to.eq(testId)
  })
  it('should update a hub', function () {
    wh.updateHub(testHubKey, newTestHubKey)
    var hubs = wh.getHubs()
    expect(_.map(hubs, 'id').indexOf(newTestHubKey)).to.not.be.eq(-1)
    expect(_.map(hubs, 'id').indexOf(testHubKey)).to.eq(-1)
    wh.selectHub(newTestHubKey, testKeyword)
    wh.updateHub(newTestHubKey, testHubKey)
    wh.selectHub(testHubKey, testKeyword)
    hubs = wh.getHubs()
    expect(_.map(hubs, 'id').indexOf(testHubKey)).to.not.be.eq(-1)
    expect(_.map(hubs, 'id').indexOf(newTestHubKey)).to.eq(-1)
  })
  it('should fail to update a nonexistent hub', function () {
    var status = wh.updateHub('fakeHub', newTestHubKey)
    expect(status).to.eq(false)
  })
  it('should fail to get an item with a nonexistent key', function () {
    var item = wh.getItem('FakeKey', testId)
    expect(item).to.eq(false)
  })
  it('should update an item', function () {
    newTestItem.id = testId
    var newItemId = wh.updateItem(newTestItem)
    var item = wh.getItem(testId)
    expect(newItemId).to.eq(newTestId)
    expect(item).to.eq(false)
  })
  it('should fail to modify a nonexistent item', function () {
    var newItemId = wh.updateItem(fakeItem)
    expect(newItemId).to.eq(false)
  })
  it('should reject same name items', function () {
    var sameItemId = wh.createItem(newTestItem)
    var itemId = wh.createItem(testItem)
    expect(sameItemId).to.eq(false)
    expect(itemId).to.eq(testId)
  })
  it('should remove an item', function () {
    wh.deleteItems([testId])
    var item = wh.getItem(testId)
    expect(item).to.eq(false)
  })
  it('should remove items', function () {
    wh.createItem(newTestItem)
    wh.deleteItems([testId, newTestId])
    var item = wh.getItem(testId)
    var otherItem = wh.getItem(newTestId)
    expect(item).to.eq(false)
    expect(otherItem).to.eq(false)
  })
  it('should remove hubs', function () {
    var removedKey = wh.deleteHub(testHubKey)
    expect(removedKey).to.eq(testHubKey)
  })
})
