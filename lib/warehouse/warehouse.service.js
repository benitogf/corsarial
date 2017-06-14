'use strict'

var aes = require('browserify-aes')
var createHash = require('sha.js')
var jsonpack = require('jsonpack')
var lz = require('lz-string')
var Promise = require('bluebird')

angular
    .module('warehouse', [])
    .factory('Warehouse', Warehouse)

function Warehouse ($window, $rootScope, $q) {
  var service = {
    setO: _set,
    getO: _get,
    createItem: createItem,
    getItem: getItem,
    getItems: getItems,
    updateItem: updateItem,
    deleteItems: deleteItems,
    createHub: createHub,
    getHub: getHub,
    getHubs: getHubs,
    selectHub: selectHub,
    updateHub: updateHub,
    deleteHub: deleteHub,
    mode: 'indexedDB',
    db: null
  }

  return service

  function _createDB (mode) {
    var localDB = {
      get: function (keys) {
        return new Promise(function (resolve, reject) {
          try {
            var data = $window.localStorage.getItem(keys.join(':'))
            resolve(data)
          } catch (e) {
            reject(e)
          }
        })
      },
      getAll: function (keys) {
        return new Promise(function (resolve, reject) {
          try {
            var data = []
            for (var i = 0; i < $window.localStorage.length; i++)   {
              if ($window.localStorage.key(i).indexOf(keys.join(':') + ':') === 0) {
                data.push({ id: $window.localStorage.key(i),  data: $window.localStorage.getItem($window.localStorage.key(i)) })
              }
            }
            resolve(data)
          } catch (e) {
            reject(e)
          }
        })
      },
      set: function (keys, data) {
        return new Promise(function (resolve, reject) {
          try {
            $window.localStorage.setItem(keys.join(':'), data)
            resolve(keys)
          } catch (e) {
            reject(e)
          }
        })
      },
      setMany: function (data) {
        return new Promise(function (resolve, reject) {
          try {
            data.forEach(function (item) {
              $window.localStorage.setItem(item.id, item.data)
            })
            resolve(data)
          } catch (e) {
            reject(e)
          }
        })
      },
      del: function (keys) {
        return new Promise(function (resolve, reject) {
          try {
            $window.localStorage.removeItem(keys.join(':'))
            resolve(keys)
          } catch (e) {
            reject(e)
          }
        })
      },
      delSome: function (keys) {
        return new Promise(function (resolve, reject) {
          try {
            for (var i = 0; i < $window.localStorage.length; i++) {
              if (keys.indexOf($window.localStorage.key(i)) !== -1) {
                 $window.localStorage.removeItem($window.localStorage.key(i))
               }
            }
            resolve(keys)
          } catch (e) {
            reject(e)
          }
        })
      },
      delAll: function (keys) {
        return new Promise(function (resolve, reject) {
          try {
            for (var i = 0; i < $window.localStorage.length; i++) {
              if ($window.localStorage.key(i).indexOf(keys.join(':') + ':') === 0) {
                 $window.localStorage.removeItem($window.localStorage.key(i))
               }
            }
            resolve(keys)
          } catch (e) {
            reject(e)
          }
        })
      },
      free: function(keys) {
        return new Promise(function (resolve, reject) {
          try {
            var result = true
            for (var i = 0; i < $window.localStorage.length; i++) {
              if ($window.localStorage.key(i) === keys.join(':')) {
                 result = false
                 break
              }
            }
            if (result) {
              resolve(keys)
            } else {
              reject(new Error('IS_NOT_FREE'))
            }
          } catch (e) {
            reject(e)
          }
        })
      },
      exist: function(keys) {
        return new Promise(function (resolve, reject) {
          try {
            var result = false
            for (var i = 0; i < $window.localStorage.length; i++) {
              if ($window.localStorage.key(i) === keys.join(':')) {
                 result = $window.localStorage.getItem($window.localStorage.key(i))
                 break
              }
            }
            if (result) {
              resolve(result)
            } else {
              reject(new Error('DOES_NOT_EXIST'))
            }
          } catch (e) {
            reject(e)
          }
        })
      }
    }

    var indexedDB = {
      db: null,
      get: function (keys) {
        return new Promise(function (resolve, reject) {
          indexedDB.operate().then(function (db) {
            return db.items.where('id').equals(keys.join(':')).toArray().then(function (result) {
              if (result[0]) {
                resolve(result[0].data)
              } else {
                reject(new Error('GET_FAIL'))
              }
            })
          }).catch(reject)
        });
      },
      getAll: function (keys) {
        return new Promise(function (resolve, reject) {
          indexedDB.operate().then(function (db) {
            return db.items.filter(function (item) {
                return item.id.indexOf(keys.join(':') + ':') === 0;
              }).toArray().then(function (result) {
              if (result) {
                resolve(result)
              } else {
                reject(new Error('GET_ALL_FAIL'))
              }
            })
          }).catch(reject)
        });
      },
      set: function (keys, data) {
        return new Promise(function (resolve, reject) {
          indexedDB.operate().then(function (db) {
             return db.items.put({ id: keys.join(':'), data: data }).then(function () {
               resolve(keys)
             })
          }).catch(reject)
        });
      },
      setMany: function (data) {
        return new Promise(function (resolve, reject) {
          indexedDB.operate().then(function (db) {
             return db.items.bulkPut(data).then(function (result) {
               resolve(result)
             })
          }).catch(reject)
        });
      },
      del: function (keys, key) {
        return new Promise(function (resolve, reject) {
          indexedDB.operate().then(function (db) {
             return db.items.where('id').equals(keys.join(':')).delete().then(function (result) {
               resolve(key)
             })
          }).catch(reject)
        })
      },
      delSome: function (keys) {
        return new Promise(function (resolve, reject) {
          indexedDB.operate().then(function (db) {
             return db.items.filter(function (item) {
                 return keys.indexOf(item.id) !== -1
               }).delete().then(function (result) {
               resolve(keys)
             })
          }).catch(reject)
        })
      },
      delAll: function (keys) {
        return new Promise(function (resolve, reject) {
           indexedDB.operate().then(function (db) {
              return db.items.filter(function (item) {
                  return item.id.indexOf(keys.join(':') + ':') === 0
                }).delete().then(function (result) {
                resolve(keys)
              })
           }).catch(reject)
        })
      },
      free: function (keys) {
        return new Promise(function (resolve, reject) {
           indexedDB.operate().then(function (db) {
              return db.items.where('id')
                .equals(keys.join(':'))
                .toArray()
                .then(function (result) {
                if (result.length === 0) {
                   resolve(keys)
                } else {
                  reject(new Error('IS_NOT_FREE'))
                }
              })
           })
        })
      },
      exist: function (keys) {
        return new Promise(function (resolve, reject) {
           indexedDB.operate().then(function (db) {
              return db.items.where('id')
                .equals(keys.join(':'))
                .toArray()
                .then(function (result) {
                if (result.length > 0) {
                   resolve(result[0].data)
                } else {
                  reject(new Error('DOES_NOT_EXIST'))
                }
              })
           })
        })
      },
      operate: function() {
        if (!indexedDB.db.isOpen()) {
             return indexedDB.db.open().then(function (db) {
                 return db;
             });
         } else {
             return new Promise(resolve => resolve(indexedDB.db))
         }
      }
    }
    switch (mode) {
      case 'indexedDB':
        var version = 1;
        try {
          indexedDB.db = new Dexie('corsarial')
          indexedDB.db.version(version).stores({
            items: '&id, data'
          })
          service.db = indexedDB
        } catch (e) {
          service.db = localDB
        }
        break
      default:
        service.db = localDB
    }
  }

  function _get (keys) {
    if (!service.db) {
      _createDB(service.mode)
    }
    return service.db.get(keys)
  }

  function _getAll (keys) {
    if (!service.db) {
      _createDB(service.mode)
    }
    return service.db.getAll(keys)
  }

  function _set (keys, data) {
    if (!service.db) {
      _createDB(service.mode)
    }
    return service.db.set(keys, data)
  }

  function _setMany (data) {
    if (!service.db) {
      _createDB(service.mode)
    }
    return service.db.setMany(data)
  }

  function _del (keys) {
    if (!service.db) {
      _createDB(service.mode)
    }
    return service.db.del(keys)
  }

  function _delSome (keys) {
    if (!service.db) {
      _createDB(service.mode)
    }
    return service.db.delSome(keys)
  }

  function _delAll (keys) {
    if (!service.db) {
      _createDB(service.mode)
    }
    return service.db.delAll(keys)
  }

  function _free (keys) {
    if (!service.db) {
      _createDB(service.mode)
    }
    return service.db.free(keys)
  }

  function _exist (keys) {
    if (!service.db) {
      _createDB(service.mode)
    }
    return service.db.exist(keys)
  }

  function setKeyword (keyword, key) {
    var comp = jsonpack.pack({
      id: key,
      keyword: keyword
    })
    var crypt = encrypt(comp, '6e6a5910ea9537a7d02e44975f4765726c4a0237c7132d3ea4cf33be76ce678b')
    $window.sessionStorage.setItem('hub', crypt)
    $rootScope.$broadcast('hub-change', true)
  }

  function getHub () {
    var crypt = $window.sessionStorage.getItem('hub')
    if (crypt) {
      var comp = decrypt(crypt, '6e6a5910ea9537a7d02e44975f4765726c4a0237c7132d3ea4cf33be76ce678b')
      var hub = jsonpack.unpack(comp)
      return hub.id
    } else {
      return false
    }
  }

  function getSession () {
    var crypt = $window.sessionStorage.getItem('hub')
    if (crypt) {
      var comp = decrypt(crypt, '6e6a5910ea9537a7d02e44975f4765726c4a0237c7132d3ea4cf33be76ce678b')
      var hub = jsonpack.unpack(comp)
      return hub
    } else {
      return false
    }
  }

  function clearKeyword () {
    $window.sessionStorage.removeItem('hub')
    $rootScope.$broadcast('hub-change', false)
  }

  function encrypt (txt, pwd) {
    var cipher = aes.createCipher('aes-256-cbc', pwd)
    var result = cipher.update(txt, 'utf8', 'base64')
    result += cipher.final('base64')
    return result
  }

  function decrypt (enc, pwd) {
    try {
      var decipher = aes.createDecipher('aes-256-cbc', pwd)
      var result = decipher.update(enc, 'base64', 'utf8') + decipher.final('utf8')
      return result
    } catch (e) {
      return false
    }
  }

  function compress(data) {
    var pack = jsonpack.pack(data)
    return lz.compressToUTF16(pack)
  }

  function decompress(data) {
    var dcomp = lz.decompressFromUTF16(data)
    return jsonpack.unpack(dcomp)
  }

  function hash(key) {
    var sha = createHash('sha256')
    return sha.update(key, 'utf8').digest('hex')
  }

  function availableId(thing, id) {
    return !_.find(thing, ['id', id])
  }

  function setItem(item) {
    var session = getSession()
    if (session) {
      var comp = compress(item)
      return _set(['item', session.id, item.id], encrypt(comp, session.keyword))
    } else {
      return new Promise((resolve, reject) => reject(new Error('SET_ITEM_NOT_SELECTED')))
    }
  }

  function setItems(items) {
    var session = getSession()
    if (session) {
      var newItems = []
      items.forEach(function (item) {
        var comp = compress(item)
        newItems.push({
          id: ['item', session.id, item.id].join(':'),
          data: encrypt(comp, session.keyword)
        })
      })
      return _setMany(newItems)
    } else {
      return new Promise((resolve, reject) => reject(new Error('SET_ITEMS_NOT_SELECTED')))
    }
  }

  function createItem (item) {
    var session = getSession()
    if (session) {
      var now = Date.now() / 1000
      var sha = createHash('sha256')
      item.id = sha.update(item.name, 'utf8').digest('hex')
      item.created = now
      item.updated = now
      var keys = ['item', session.id, item.id]
      return _free(keys).then(function () {
        return setItem(item)
      })
    } else {
      return new Promise((resolve, reject) => reject(new Error('CREATE_ITEM_NOT_SELECTED')))
    }
  }

  function updateItem (item) {
    var session = getSession()
    if (session) {
      var keys = ['item', session.id, item.id]
      return  _exist(keys).then(function () {
        var now = Date.now() / 1000
        item.id = hash(item.name)
        item.updated = now
        return setItem(item)
      })
    } else {
      return new Promise((resolve, reject) => reject(new Error('UPDATE_ITEM_NOT_SELECTED')))
    }
  }

  function deleteItems (ids) {
    var session = getSession()
    if (session) {
      var toDel = []
      ids.forEach(function (id) {
        toDel.push('item:' + session.id + ':' + id)
      })
      return _delSome(toDel)
    } else {
      return new Promise(function (resolve, reject) { reject(new Error('DELETE_ITEMS_NOT_SELECTED')) })
    }
  }

  function getItem (id) {
    return new Promise(function (resolve, reject) {
      var session = getSession()
      if (session) {
        var keys = ['item', session.id, id]
        _get(keys).then(function (data) {
          var dec = decrypt(data, session.keyword)
          if (dec) {
            resolve(decompress(dec))
          } else {
            reject(new Error('ITEM_READ_FAIL'))
          }
        }).catch(reject)
      } else {
        reject(new Error('GET_ITEM_NOT_SELECTED'))
      }
    })
  }

  function getItems () {
    return new Promise(function (resolve, reject) {
      var session = getSession()
      if (session) {
        var keys = ['item', session.id]
        _getAll(keys).then(function (items) {
          var result = []
          items.forEach(function (item) {
            var dec = decrypt(item.data, session.keyword)
            if (dec && result) {
              result.push(decompress(dec))
            } else {
              result = false
            }
          })
          if (result) {
            resolve(result)
          } else {
            clearKeyword()
            reject(new Error('ITEMS_READ_FAIL'))
          }
        }).catch(function (err) {
          reject(err)
        })
      } else {
        reject(new Error('GET_ITEMS_NOT_SELECTED'))
      }
    })
  }

  function setHub(hub) {
    return _set(['hub', hub.id], compress(hub))
  }

  function getHubs () {
    var keys = ['hub']
    return _getAll(keys).then(function (hubs) {
      var result = []
      hubs.forEach(function (hub) {
        result.push(decompress(hub.data))
      })
      return result
    })
  }

  function selectHub (key, keyword) {
    setKeyword(keyword, key)
    return getItems()
  }

  function createHub (key, keyword) {
    var now = Date.now() / 1000
    var hub = {
      id: key,
      created: now,
      updated: now
    }
    var keys = ['hub', key]
    return _free(keys).then(function () {
      return setHub(hub).then(function () {
        setKeyword(keyword, key)
        return hub
      })
    })
  }

  function updateHub (key, newKey, newKeyword) {
    var now = Date.now() / 1000
    var session = getSession()
    if (session && session.id === key) {
      return _free(['hub', newKey]).then(function () {
        return _exist(['hub', key]).then(function (data) {
          return getItems().then(function (items) {
            return _delAll(['item', key]).then(function () {
              return _del(['hub', key]).then(function () {
                var hub = decompress(data)
                hub.id = newKey
                hub.updated = now
                return setHub(hub).then(function () {
                  var keyword = newKeyword || session.keyword
                  setKeyword(keyword, newKey)
                  return setItems(items).then(function() {
                    clearKeyword()
                    return newKey
                  })
                })
              })
            })
          })
        })
      })
    } else {
      return new Promise((resolve, reject) => reject(new Error('UPDATE_HUB_NOT_SELECTED')))
    }
  }

  function deleteHub (id) {
    var hub = getHub()
    if (hub === id) {
      return _delAll(['item', hub]).then(function () {
        return _del(['hub', id]).then(function () {
          return getHubs().then(function (hubs) {
            clearKeyword()
            return hubs
          })
        })
      })
    } else {
      return new Promise((resolve, reject) => reject(new Error('DELETE_HUB_NOT_SELECTED')))
    }
  }

}
