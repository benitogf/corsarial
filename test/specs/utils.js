var utils = {
  translateProvider: translateProvider,
  routeParamsProvider: routeParamsProvider,
  mdSidenavProvider: mdSidenavProvider,
  i18nServiceProvider: i18nServiceProvider,
  timeoutProvider: timeoutProvider,
  mdUtilProvider: mdUtilProvider,
  canvasGetCtx: canvasGetCtx
}
function canvasGetCtx () {
  return function () {
    return {
      fillRect: function () {},
      clearRect: function () {},
      setTransform: function () {},
      drawImage: function () {},
      save: function () {},
      restore: function () {},
      beginPath: function () {},
      moveTo: function () {},
      lineTo: function () {},
      closePath: function () {},
      stroke: function () {},
      translate: function () {},
      scale: function () {},
      rotate: function () {},
      arc: function () {},
      fill: function () {}
    }
  }
}
function mdUtilProvider ($provide) {
  $provide.factory('$mdUtil', function () {
    return {
      nextTick: then
    }
  })
}
function i18nServiceProvider ($provide) {
  $provide.factory('i18nService', function () {
    return {}
  })
}
function mdSidenavProvider ($provide) {
  $provide.factory('$mdSidenav', function () {
    var nav = {
      left: false,
      right: false
    }
    return function (side) {
      return {
        open: function (side) {
          nav[side] = true
          return {
            then: then
          }
        },
        close: function (side) {
          nav[side] = false
          return {
            then: then
          }
        },
        toggle: function (side) {
          nav[side] = !nav[side]
          return {
            then: then
          }
        },
        isOpen: function (side) {
          return nav[side]
        }
      }
    }
  })
}
function timeoutProvider ($provide) {
  $provide.factory('$timeout', function () {
    return then
  })
}
function then (cb) {
  cb()
}
function translateProvider ($provide) {
  $provide.factory('$translate', function () {
    return {
      use: function () {
        return
      },
      instant: function (text) {
        return text
      }
    }
  })
}
function routeParamsProvider ($provide) {
  $provide.factory('$routeParams', function () {
    return {
      name: 'test',
      id: 1
    }
  })
}
if (typeof module !== 'undefined') {
  module.exports = utils
} else {
  window.mockUtils = utils
}