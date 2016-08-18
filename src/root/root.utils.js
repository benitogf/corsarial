module.exports = {
    hideLoader: function() {
      $('#content').css('opacity', '1');
      $('header').css('opacity', '1');
      $('#loading').css('display', 'none');
    },
    showLoader: function() {
      $('#content').css('opacity', '0');
      $('header').css('opacity', '0');
      $('#loading').css('display', 'block');
    },
    delayLoad: function($q, $timeout, $mdSidenav) {
      var delay = $q.defer();
      utils.showLoader();
      $timeout(function(){
          $mdSidenav('left').close().then(function () {
              utils.hideLoader();
              delay.resolve();
          });
      }, 1000);
      return delay.promise;
    },
    getTranslation: function(files) {
        var translation = {};
        _.forEach(files, function(value){
            _.extend(translation, value);
        });
        return translation;
    },
    errorConfirm: function () {
        document.location.reload();
    },
    errorHandler: function (message) {
        console.log('error ' + message);
        navigator.notification.alert(
             message, // message
             app.errorConfirm, // callback to invoke with index of button pressed
             'Error', // title
             'Restart' // buttonLabels
        );
    }
};
