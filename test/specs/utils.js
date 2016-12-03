var utils = {
  translateProvider: translateProvider,
  stateParamsProvider: stateParamsProvider,
  stateProvider: stateProvider,
  mdSidenavProvider: mdSidenavProvider,
  mdToastProvider: mdToastProvider,
  mdDialogProvider: mdDialogProvider,
  i18nServiceProvider: i18nServiceProvider,
  timeoutProvider: timeoutProvider,
  mdUtilProvider: mdUtilProvider,
  warehouseProvider: warehouseProvider,
  canvasGetCtx: canvasGetCtx,
  MutationObserver: MutationObserver,
  getSelection: getSelection
}
function getSelection () {
  return {
    getRangeAt: function () {}
  }
}
function MutationObserver () {
  // https://github.com/tmpvar/jsdom/issues/639
  return {
    observe: function () { return [] },
    takeRecords: function () { return [] }
  }
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
function warehouseProvider ($provide) {
  $provide.factory('Warehouse', function () {
    return {
      getHub: function () { return },
      getItem: function () { return },
      createItem: function () { return },
      updateItem: function () { return }
    }
  })
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
function mdToastProvider ($provide) {
  $provide.factory('$mdToast', function () {
    return {}
  })
}
function mdDialogProvider ($provide) {
  $provide.factory('$mdDialog', function () {
    return {}
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
function stateParamsProvider ($provide) {
  $provide.factory('$stateParams', function () {
    return {
      name: 'test',
      id: 1
    }
  })
}
function stateProvider ($provide) {
  $provide.factory('$state', function () {
    return {
      go: function () {
        return
      }
    }
  })
}
if (typeof module !== 'undefined') {
  module.exports = utils
} else {
  window.mockUtils = utils
}
