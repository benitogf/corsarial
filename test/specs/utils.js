var utils = {
  translateProvider: translateProvider,
  stateParamsProvider: stateParamsProvider,
  stateProvider: stateProvider,
  momentProvider: momentProvider,
  amMomentProvider: amMomentProvider,
  mdSidenavProvider: mdSidenavProvider,
  mdToastProvider: mdToastProvider,
  mdDialogProvider: mdDialogProvider,
  mdMediaProvider: mdMediaProvider,
  i18nServiceProvider: i18nServiceProvider,
  timeoutProvider: timeoutProvider,
  mdUtilProvider: mdUtilProvider,
  warehouseProvider: warehouseProvider,
  formatsProvider: formatsProvider,
  canvasGetCtx: canvasGetCtx,
  MutationObserver: MutationObserver,
  ObEntries: ObEntries,
  ObValues: ObValues,
  getSelection: getSelection,
  delayView: delayView
}
function getSelection () {
  return {
    getRangeAt: function () {}
  }
}
function delayView () {}
function MutationObserver () {
  // https://github.com/tmpvar/jsdom/issues/639
  return {
    observe: function () { return [] },
    takeRecords: function () { return [] }
  }
}
function ObEn (obj) {
  var ownProps = Object.keys( obj ),
     i = ownProps.length,
     resArray = new Array(i); // preallocate the Array

  while (i--)
     resArray[i] = [ownProps[i], obj[ownProps[i]]];
  return resArray;
}
function ObVa (obj) {
  var vals = [];
	for (var key in obj) {
		if (has(obj, key) && isEnumerable(obj, key)) {
			vals.push(obj[key]);
		}
	}
	return vals;
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
      getHub: function () {
        return {
          then: function (cb) {
            cb({ id: 0 }) // eslint-disable-line
            return {
              catch: function () {}
            }
          }
        }
      },
      getHubs: function () {
        return {
          then: function (cb) {
            cb([ { id: 0 }, { id: 1 } ])  // eslint-disable-line
            return {
              catch: function () {}
            }
          }
        }
      },
      getItem: function () {
        return {
          then: function (cb) {
            cb({ id: 0, content: { text: '0' } }) // eslint-disable-line
            return {
              catch: function () {}
            }
          }
        }
      },
      getItems: function () {
        return {
          then: function (cb) {
            cb([ { id: 0, content: { text: '0' } }, { id: 1, content: { text: '1' } } ]) // eslint-disable-line
            return { catch: function () {} }
          }
        }
      },
      createItem: function () { return { then: then } },
      createHub: function () { return { then: then } },
      selectHub: function () { return { then: then } },
      updateHub: function () { return { then: then } },
      deleteHub: function () { return { then: then } },
      updateItem: function () { return { then: then } },
      deleteItems: function () { return { then: then } }
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
    return {
      show: function () {},
      simple: function () {
        return {
          textContent: function () {
            return {
              position: function () {
                return {
                  hideDelay: function () {}
                }
              }
            }
          }
        }
      }
    }
  })
}
function mdDialogProvider ($provide) {
  $provide.factory('$mdDialog', function () {
    return {
      hide: function () {},
      cancel: function () {},
      show: function (options) {
        return {
          then: function (cb) {
            cb()
            return {
              control: options.controller,
              catch: function (cb) { cb() }
            }
          }
        }
      }
    }
  })
}
function mdMediaProvider ($provide) {
  $provide.factory('$mdMedia', function () {
    return function () {}
  })
}
function timeoutProvider ($provide) {
  $provide.factory('$timeout', function () {
    return then
  })
}
function then (cb) {
  cb()
  return { catch: function (cb) { cb() } }
}
function translateProvider ($provide) {
  $provide.factory('$translate', function () {
    return {
      use: function () {},
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
      }
    }
  })
}
function momentProvider ($provide) {
  $provide.factory('moment', function () {
    return function () {
      return {
        unix: function () {},
        format: function () {}
      }
    }
  })
}
function amMomentProvider ($provide) {
  $provide.factory('amMoment', function () {
    return {
      changeLocale: function () {}
    }
  })
}
function formatsProvider ($provide) {
  $provide.factory('FORMATS', function () {
    return {}
  })
}
if (typeof module !== 'undefined') {
  module.exports = utils
} else {
  window.mockUtils = utils
}
