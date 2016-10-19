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
  keywordCheck: function (Warehouse, $location) {
    if (!Warehouse.getHub()) {
      $location.path('/')
    }
    return Warehouse.getHub()
  },
  errorConfirm: function () {
    document.location.reload()
  },
  errorHandler: function (message) {
    navigator.notification.alert(
             message, // message
             utils.errorConfirm, // callback to invoke with index of button pressed
             'Error', // title
             'Restart' // buttonLabels
        )
  }
}
