'use strict'

module.exports = {
  delayLoad: function ($rootScope, $q, $timeout, $mdSidenav, $state) {
    var delay = $q.defer()
    $q.all([$mdSidenav('right').close(), $mdSidenav('left').close()]).then(function () {
      delay.resolve()
    })
    return delay.promise
  },
  delayView: function ($rootScope, $q, $timeout) {
    var delay = $q.defer()
    $rootScope.loading = true
    $timeout(function () {
      $rootScope.loading = false
      delay.resolve()
    }, 1000)
    return delay.promise
  },
  keywordCheck: function (Warehouse, $state) {
    if (!Warehouse.getHub()) {
      $state.go('hubs', { reload: true })
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
