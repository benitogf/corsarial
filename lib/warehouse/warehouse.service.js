'use strict'

var aes = require('browserify-aes')
var createHash = require('sha.js')
var jsonpack = require('jsonpack')
var lz = require('lz-string')

angular
    .module('warehouse', [])
    .factory('Warehouse', Warehouse)

function Warehouse ($window, $rootScope, $q) {
  var service = {
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
    deleteHub: deleteHub
  }

  return service

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

  function createItem (item) {
    var now = Date.now() / 1000
    var sha = createHash('sha256')
    item.id = sha.update(item.name, 'utf8').digest('hex')
    item.created = now
    item.updated = now
    var items = getItems()
    if (items) {
      if (availableItemId(items, item.id)) {
        items.push(item)
        setItems(items)
        return item.id
      } else {
        return false
      }
    } else {
      return false
    }
  }

  function updateItem (item) {
    var now = Date.now() / 1000
    var sha = createHash('sha256')
    var id = item.id
    item.id = sha.update(item.name, 'utf8').digest('hex')
    var items = getItems()
    if (items) {
      if (availableItemId(items, id)) {
        return false
      } else {
        item.updated = now
        var newItems = filterItems([id])
        newItems.push(item)
        setItems(newItems)
        return item.id
      }
    } else {
      return false
    }
  }

  function availableItemId (items, id) {
    var result = true
    items.forEach(function (item) {
      if (item.id === id) {
        result = false
      }
    })
    return result
  }

  function filterItems (ids) {
    var items = getItems()
    if (items) {
      var newItems = []
      items.forEach(function (item) {
        if (ids.indexOf(item.id) === -1) {
          newItems.push(item)
        }
      })
      return newItems
    } else {
      return false
    }
  }

  function deleteItems (ids) {
    var newItems = filterItems(ids)
    if (newItems) {
      setItems(newItems)
      return ids
    } else {
      return false
    }
  }

  function getItem (id) {
    var items = getItems()
    var result = false
    if (items) {
      items.forEach(function (item) {
        if (item.id === id) {
          result = item
        }
      })
    }
    return result
  }

  function setItems (value) {
    var session = getSession()
    if (session) {
      var pack = jsonpack.pack(value)
      var comp = lz.compressToUTF16(pack)
      $window.localStorage.setItem(session.id, encrypt(comp, session.keyword))
      return true
    } else {
      return false
    }
  }

  function getItems () {
    var session = getSession()
    if (session) {
      var rawItems = $window.localStorage.getItem(session.id)
      var dec = decrypt(rawItems, session.keyword)
      if (dec) {
        var dcomp = lz.decompressFromUTF16(dec)
        return jsonpack.unpack(dcomp)
      } else {
        return false
      }
    } else {
      return false
    }
  }

  function prepareHubs (hubs) {
    var result = []
    var currentHub = getHub()
    hubs.forEach(function (hub, index) {
      if ($window.localStorage.getItem(hub.id)) {
        result.push(hub)
      }
    })
    setHubs(result)
    result.forEach(function (hub, index) {
      result[index].selected = (hub.id === currentHub)
    })
    return result
  }

  function getHubs () {
    var rawHubs = $window.localStorage.getItem('hubs')
    if (!rawHubs) {
      createHub('public', 'public', true)
    }
    rawHubs = $window.localStorage.getItem('hubs')
    if (rawHubs) {
      var dcomp = lz.decompressFromUTF16(rawHubs)
      var hubs = prepareHubs(jsonpack.unpack(dcomp))
      return hubs
    } else {
      return []
    }
  }

  function availableHubId (hubs, id) {
    var result = true
    hubs.forEach(function (hub) {
      if (hub.id === id) {
        result = false
      }
    })
    return result
  }

  function selectHub (key, keyword) {
    setKeyword(keyword, key)
    if (getItems()) {
      return true
    } else {
      clearKeyword()
      return false
    }
  }

  function createHub (key, keyword, empty) {
    var now = Date.now() / 1000
    var hubs = (empty) ? [] : getHubs()
    var newHub = {
      id: key,
      created: now,
      updated: now
    }
    if (availableHubId(hubs, key)) {
      hubs.push(newHub)
      setKeyword(keyword, key)
      setItems([])
      setHubs(hubs)
      return key
    } else {
      return false
    }
  }

  function setHubs (hubs) {
    var pack = jsonpack.pack(hubs)
    var comp = lz.compressToUTF16(pack)
    $window.localStorage.setItem('hubs', comp)
  }

  function filterHubs (key) {
    var result = []
    var hubs = getHubs()
    hubs.forEach(function (item) {
      if (key !== item.id) {
        result.push(item)
      }
    })
    return result
  }

  function updateHub (key, newKey, newKeyword) {
    var now = Date.now() / 1000
    var session = getSession()
    if (session.id === key) {
      var hubs = getHubs()
      var items = getItems()
      var keyword = newKeyword || session.keyword
      hubs.forEach(function (item, index) {
        delete hubs[index].selected
        if (item.id === key) {
          hubs[index].id = newKey
          hubs[index].updated = now
        }
      })
      setHubs(hubs)
      removeItems(key)
      setKeyword(keyword, newKey)
      setItems(items)
      clearKeyword()
      return newKey
    } else {
      return false
    }
  }

  function deleteHub (key) {
    var hub = getHub()
    if (hub === key) {
      var hubs = filterHubs(key)
      removeItems(key)
      if (hubs.length === 0) {
        $window.localStorage.removeItem('hubs')
      } else {
        setHubs(hubs)
      }
      clearKeyword()
      return key
    } else {
      return false
    }
  }

  function removeItems (key) {
    $window.localStorage.removeItem(key)
  }
}
