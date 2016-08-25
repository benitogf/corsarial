'use strict'

module.exports = {
  delayLoad: function ($rootScope, $q, $timeout, $mdSidenav) {
    var delay = $q.defer()
    $rootScope.loading = true
    $timeout(function () {
      $q.all([$mdSidenav('right').close(), $mdSidenav('left').close()]).then(function () {
        $rootScope.loading = false
        delay.resolve()
      })
    }, 1000)
    return delay.promise
  },
  getTranslation: function (files) {
    var translation = {}
    _.forEach(files, function (value) {
      _.extend(translation, value)
    })
    return translation
  },
  errorConfirm: function () {
    document.location.reload()
  },
  errorHandler: function (message) {
    console.log('error ' + message)
    navigator.notification.alert(
             message, // message
             utils.errorConfirm, // callback to invoke with index of button pressed
             'Error', // title
             'Restart' // buttonLabels
        )
  }
}
