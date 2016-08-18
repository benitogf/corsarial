require('./root.theme');
require('../i18n/i18n.service');
require('../nav/nav.module');
require('./loader/loader.directive');
require('../../lib/md-data-grid/md-data-grid');
require('../../lib/md-d3-graph/md-d3-graph');

(function() {

    angular.module('app.root',[
        'i18n',
        'app.nav',
        'app.theme',
        'mdLoader',
        'mdDataGrid',
        'mdD3Graph'
    ])

})();
