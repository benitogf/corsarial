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
  var newTestHubKey = 'testHubNew'
  var testKeyword = 'testKeyword1'
  var newTestKeyword = 'newTestKeyword1'
  var testId = '6e6a5910ea9537a7d02e44975f4765726c4a0237c7132d3ea4cf33be76ce678b'
  var newTestId = '3941b238daab168b5b742ef81603cd2c71fb83aa75b0a8044cc414561d7bf81a'
  var wh
  beforeEach(function () {
    angular.mock.module('warehouse')
    angular.mock.inject(function ($injector) {
      wh = $injector.get('Warehouse')
    })
  })
  it('should use localStorage', function (done) {
    wh.setO(['fizz', 'buzz'], 'buzz').then(function (buzz) {
      return wh.getO(['fizz', 'buzz']).then(function (fizz) {
        expect(fizz).to.eq('buzz')
        done()
      })
    }).catch(done)
  })
  it('should use indexedDB', function (done) {
    wh.mode = 'indexedDB'
    wh.setO(['fizz', 'buzz'], 'buzz').then(function (buzz) {
      return wh.getO(['fizz', 'buzz']).then(function (fizz) {
        expect(fizz).to.eq('buzz')
        done()
      })
    }).catch(done)
  })
  it('should delete test hub', function (done) {
    wh.getHubs().then(function (hubs) {
      var hubIds = _.map(hubs, 'id')
      if (hubIds.indexOf(testHubKey) !== -1) {
        return wh.selectHub(testHubKey, testKeyword).then(function (items) {
          return wh.deleteHub(testHubKey).then(function (result) {
            done()
          })
        }).catch(function () {
          done()
        })
      } else {
        done()
      }
    })
  })
  it('should delete other test hub', function (done) {
    wh.getHubs().then(function (hubs) {
      var hubIds = _.map(hubs, 'id')
      if (hubIds.indexOf(newTestHubKey) !== -1) {
        return wh.selectHub(newTestHubKey, newTestKeyword).then(function (items) {
          return wh.deleteHub(newTestHubKey).then(function (result) {
            done()
          })
        }).catch(function () {
          done()
        })
      } else {
        done()
      }
    })
  })
  it('should create a hub', function (done) {
    wh.createHub(testHubKey, testKeyword).then(function (hub) {
      expect(hub.id).to.eq(testHubKey)
      done()
    }).catch(done)
  })
  it('should fail to create a duplicated hub', function (done) {
    wh.createHub(testHubKey, testKeyword).then(function () {
      done(new Error('Duplicated hub created'))
    }).catch(function () {
      done()
    })
  })
  it('should get a list of hubs', function (done) {
    wh.getHubs().then(function (hubs) {
      expect(hubs).to.be.an.instanceOf(Array)
      done()
    }).catch(done)
  })
  it('should create an item', function (done) {
    wh.deleteItems([testId, newTestId]).then(function () {
      return wh.createItem(testItem).then(function (newItemId) {
        expect(newItemId[2]).to.eq(testId)
        return wh.getItems().then(function (items) {
          expect(items.length).to.eq(1)
          done()
        })
      })
    }).catch(done)
  })
  it('should get an item', function (done) {
    wh.getItem(testId).then(function (item) {
      expect(item.id).to.eq(testId)
      done()
    }).catch(done)
  })
  it('should update an item', function (done) {
    var otherItem = _.clone(newTestItem)
    otherItem.id = testId
    wh.updateItem(otherItem).then(function (newId) {
      expect(newId[2]).to.eq(newTestId)
      done()
    }).catch(done)
  })
  it('should fail to get an item with a nonexistent key', function (done) {
    wh.getItem('FakeKey').then(function (data) {
      done(new Error('got nonexistent item key data: ' + data))
    }).catch(function () {
      done()
    })
  })
  it('should fail to update a nonexistent item', function (done) {
    wh.updateItem(fakeItem).then(function () {
      done(new Error('updated nonexistent item'))
    }).catch(function () {
      done()
    })
  })
  it('should fail to create duplicated items', function (done) {
    wh.createItem(newTestItem).then(function () {
      done(new Error('created duplicated item'))
    }).catch(function () {
      done()
    })
  })
  it('should remove an item', function (done) {
    wh.deleteItems([newTestId]).then(function (newItems) {
      expect(_.map(newItems, 'id').indexOf(newTestId)).to.eq(-1)
      done()
    }).catch(done)
  })
  it('should update a hub', function (done) {
    wh.updateHub(testHubKey, newTestHubKey, newTestKeyword).then(function () {
      return wh.getHubs().then(function (hubs) {
        expect(_.map(hubs, 'id').indexOf(newTestHubKey)).to.not.be.eq(-1)
        expect(_.map(hubs, 'id').indexOf(testHubKey)).to.eq(-1)
        done()
      })
    }).catch(done)
  })
  it('should create a hub with previously used id', function (done) {
    wh.createHub(testHubKey, testKeyword).then(function (hub) {
      expect(hub.id).to.eq(testHubKey)
      return wh.getItems().then(function () {
        done()
      })
    }).catch(done)
  })
  it('should fail to update a nonexistent hub', function (done) {
    wh.updateHub('fakeHub', newTestHubKey).then(function () {
      done(new Error('nonexistent hub updated'))
    }).catch(function () {
      done()
    })
  })
  it('should remove items', function (done) {
    wh.selectHub(newTestHubKey, newTestKeyword).then(function (items) {
      return wh.deleteItems([testId, newTestId]).then(function () {
        done()
      })
    }).catch(done)
  })
  it('should delete test hub', function (done) {
    wh.getHubs().then(function (hubs) {
      var hubIds = _.map(hubs, 'id')
      if (hubIds.indexOf(testHubKey) !== -1) {
        return wh.selectHub(testHubKey, testKeyword).then(function (items) {
          return wh.deleteHub(testHubKey).then(function (result) {
            done()
          })
        }).catch(function () {
          done()
        })
      } else {
        done()
      }
    })
  })
  it('should delete other test hub', function (done) {
    wh.getHubs().then(function (hubs) {
      var hubIds = _.map(hubs, 'id')
      if (hubIds.indexOf(newTestHubKey) !== -1) {
        return wh.selectHub(newTestHubKey, newTestKeyword).then(function (items) {
          return wh.deleteHub(newTestHubKey).then(function (result) {
            done()
          })
        }).catch(function () {
          done()
        })
      } else {
        done()
      }
    })
  })
})
