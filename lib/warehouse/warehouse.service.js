'use strict';

var aes = require('browserify-aes');
var createHash = require('sha.js');
var jsonpack = require('jsonpack');
var lz = require('lz-string');

angular
    .module('warehouse', [])
    .factory('Warehouse', Warehouse);

function Warehouse($window, $rootScope) {
    var keyword = $rootScope.keyword || 'f47a98b022ff9acdc229a58989f7ec440de182cff0df123ab2dd3d9f74a225e8';
    var service = {
        setItem: setItem,
        getItem: getItem,
        modifyItem: modifyItem,
        removeItems: removeItems,
        clearAll: clearAll,
    };

    return service;


    function encrypt (txt, pwd) {
        var cipher = aes.createCipher('aes-256-cbc', pwd)
        var result = cipher.update(txt, 'utf8', 'base64')
        result += cipher.final('base64')
        return result
    }

    function decrypt (enc, pwd) {
        try{
            var decipher = aes.createDecipher('aes-256-cbc', pwd)
            var result = decipher.update(enc, 'base64', 'utf8') + decipher.final('utf8');
            return result;
        } catch(e) {
            return false;
        }

    }

    function setItem(key, item) {
        var sha = createHash('sha256');
        item.id = sha.update(item.name, 'utf8').digest('hex');
        var bucket = getBucket(key);
        if (bucket) {
            if (checkBucketId(bucket, item.id)) {
                bucket.push(item);
                saveBucket(key, bucket);
                return item.id;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function modifyItem(key, id, item) {
        var sha = createHash('sha256');
        item.id = sha.update(item.name, 'utf8').digest('hex');
        var bucket = getBucket(key);
        if (bucket) {
            if (checkBucketId(bucket, id)) {
                return false;
            } else {
                var newBucket = filterBucket(key, [id]);
                newBucket.push(item);
                saveBucket(key, newBucket);
                return item.id;
            }
        } else {
            return false;
        }
    }

    function checkBucketId(bucket, id) {
        var result = true;
        bucket.forEach(function(item) {
            if (item.id === id) {
                result = false;
            }
        });
        return result;
    }

    function filterBucket(key, ids) {
        var bucket = getBucket(key);
        if (bucket) {
            var newBucket = [];
            bucket.forEach(function(item){
                if (ids.indexOf(item.id) === -1) {
                    newBucket.push(item);
                }
            });
            return newBucket;
        } else {
            return false;
        }
    }

    function removeItems(key, ids) {
        var newBucket = filterBucket(key, ids);
        if (newBucket.length > 0) {
            saveBucket(key, newBucket);
        } else {
            removeBucket(key);
        }
    }

    function getItem(key, id) {
        var bucket = getBucket(key);
        var result = false;
        if (bucket) {
            bucket.forEach(function(item){
                if (item.id === id) {
                    result = item;
                }
            });
        }
        return result;
    }

    function saveBucket(key, value) {
        var pack = jsonpack.pack(value);
        var comp = lz.compressToUTF16(pack);
        $window.localStorage.setItem(key, encrypt(comp, keyword));
    }

    function getBucket(key) {
        var rawBucket = $window.localStorage.getItem(key);
        if (rawBucket) {
            var dec = decrypt($window.localStorage.getItem(key), keyword);
            if (dec) {
               var dcomp = lz.decompressFromUTF16(dec);
               return jsonpack.unpack(dcomp);
            } else {
               return false;
            }
        } else {
            return [];
        }
    }

    function removeBucket(key) {
        $window.localStorage.removeItem(key);
    }

    function clearAll() {
        $window.localStorage.clear();
    }

}
