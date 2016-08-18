require('./nav.service');
require('./nav.directive');
require('./nav-link/nav-link.directive');
require('./nav-toggle/nav-toggle.directive');
require('./nav-left/nav-left.controller');
require('./nav-right/nav-right.controller');

(function() {

    angular.module('app.nav',[
        'mdNav',
        'nav.left',
        'nav.right',
        'nav.link',
        'nav.toggle',
        'nav.service'
    ])

})();
