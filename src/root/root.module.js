require('./root.route');
require('./nav/nav.module');
require('./root.theme');
require('../../lib/md-data-grid/md-data-grid');
require('../../lib/md-d3-graph/md-d3-graph');
require('../tags/grid/grid.controller');
require('../tags/home/home.controller');
require('../tags/error/error.controller');

(function() {

    angular.module('app.root',[
        'app.root.route',
        'app.root.nav',
        'app.root.theme',
        'app.error',
        'app.grid',
        'app.home',
        'mdDataGrid',
        'mdD3Graph'
    ])

})();
