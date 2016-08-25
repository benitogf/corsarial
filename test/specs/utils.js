var utils = {
  translateProvider: translateProvider
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
if (typeof module !== 'undefined') {
  module.exports = utils
} else {
  window.mockUtils = utils
}
