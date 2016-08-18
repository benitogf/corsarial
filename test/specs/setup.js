window.expect = chai.expect;
//AssertionError = chai.AssertionError;
window.beforeEach = mocha.beforeEach;
window.afterEach = mocha.afterEach;
window.mockUtils = (function () {
    return {
        translateProvider: translateProvider,
    };
    function translateProvider($provide) {
          $provide.factory('$translate', function(){
              return {
                  use: function(){
                      return;
                  },
                  instant: function(text){
                      return text;
                  }
              };
          });
    }
})();
mocha.setup('bdd');
