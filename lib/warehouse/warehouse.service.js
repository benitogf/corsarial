'use strict'

var aes = require('browserify-aes')
var createHash = require('sha.js')
var jsonpack = require('jsonpack')
var lz = require('lz-string')

angular
    .module('warehouse', [])
    .factory('Warehouse', Warehouse)

function Warehouse ($window, $rootScope) {
  var service = {
    createBucket: createBucket,
    getBuckets: getBuckets,
    removeBuckets: removeBuckets,
    setItem: setItem,
    getItem: getItem,
    getItems: getItems,
    modifyItem: modifyItem,
    removeItems: removeItems
  }

  return service

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

  function setItem (key, item) {
    var sha = createHash('sha256')
    item.id = sha.update(item.name, 'utf8').digest('hex')
    var items = getItems(key)
    if (items) {
      if (checkItemId(items, item.id)) {
        items.push(item)
        setItems(key, items)
        return item.id
      } else {
        return false
      }
    } else {
      return false
    }
  }

  function modifyItem (key, id, item) {
    var sha = createHash('sha256')
    item.id = sha.update(item.name, 'utf8').digest('hex')
    var bucket = getItems(key)
    if (bucket) {
      if (checkItemId(bucket, id)) {
        return false
      } else {
        var newBucket = filterItems(key, [id])
        newBucket.push(item)
        setItems(key, newBucket)
        return item.id
      }
    } else {
      return false
    }
  }

  function checkItemId (bucket, id) {
    var result = true
    bucket.forEach(function (item) {
      if (item.id === id) {
        result = false
      }
    })
    return result
  }

  function filterItems (key, ids) {
    var bucket = getItems(key)
    if (bucket) {
      var newBucket = []
      bucket.forEach(function (item) {
        if (ids.indexOf(item.id) === -1) {
          newBucket.push(item)
        }
      })
      return newBucket
    } else {
      return false
    }
  }

  function removeItems (key, ids) {
    var newBucket = filterItems(key, ids)
    if (newBucket) {
      if (newBucket.length > 0) {
        setItems(key, newBucket)
      } else {
        removeBucket(key)
      }
      return ids
    } else {
      return false
    }
  }

  function getItem (key, id) {
    var bucket = getItems(key)
    var result = false
    if (bucket) {
      bucket.forEach(function (item) {
        if (item.id === id) {
          result = item
        }
      })
    }
    return result
  }

  function setItems (key, value) {
    var keyword = $rootScope.keyword || 'f47a98b022ff9acdc229a58989f7ec440de182cff0df123ab2dd3d9f74a225e8'
    var pack = jsonpack.pack(value)
    var comp = lz.compressToUTF16(pack)
    $window.localStorage.setItem(key, encrypt(comp, keyword))
  }

  function getItems (key) {
    var keyword = $rootScope.keyword || 'f47a98b022ff9acdc229a58989f7ec440de182cff0df123ab2dd3d9f74a225e8'
    var rawItems = $window.localStorage.getItem(key)
    if (rawItems) {
      var dec = decrypt(rawItems, keyword)
      if (dec) {
        var dcomp = lz.decompressFromUTF16(dec)
        return jsonpack.unpack(dcomp)
      } else {
        return false
      }
    } else {
      return []
    }
  }

  function getBuckets () {
    var rawBuckets = $window.localStorage.getItem('buckets')
    if (rawBuckets) {
      var dcomp = lz.decompressFromUTF16(rawBuckets)
      return jsonpack.unpack(dcomp)
    } else {
      return []
    }
  }

  function checkBucketId (buckets, id) {
    var result = true
    buckets.forEach(function (bucket) {
      if (bucket.id === id) {
        result = false
      }
    })
    return result
  }

  function createBucket (key) {
    var buckets = getBuckets()
    var newBucket = {
      id: key,
      created: Date.now(),
      updated: null
    }
    if (checkBucketId(buckets, key)) {
      buckets.push(newBucket)
      setItems(key, [])
      setBuckets(buckets)
      return key
    } else {
      return false
    }
  }

  function setBuckets (buckets) {
    var pack = jsonpack.pack(buckets)
    var comp = lz.compressToUTF16(pack)
    $window.localStorage.setItem('buckets', comp)
  }

  function filterBuckets (keys) {
    var result = []
    var buckets = getBuckets()
    buckets.forEach(function (item) {
      if (keys.indexOf(item.id) === -1) {
        result.push(item)
      }
    })
    return result
  }

  function removeBuckets (keys) {
    var buckets = filterBuckets(keys)
    keys.forEach(function (key) {
      removeBucket(key)
    })
    if (buckets.length === 0) {
      $window.localStorage.removeItem('buckets')
    } else {
      setBuckets(buckets)
    }
    return keys
  }

  function removeBucket (key) {
    $window.localStorage.removeItem(key)
  }
}
