require('./nav.service');
require('./nav.controller');
require('./nav-link/nav-link.directive');
require('./nav-toggle/nav-toggle.directive');
require('./nav-left/nav-left.controller');
require('./nav-right/nav-right.controller');

(function() {

    angular.module('app.root.nav',[
        'app.root.nav.left',
        'app.root.nav.right',
        'app.root.nav.link',
        'app.root.nav.toggle',
        'app.root.nav.service',
        'app.root.nav.controller'
    ]);

})();
