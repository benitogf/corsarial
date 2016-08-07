(function() {

    angular.module('app.root.nav.service',[])
    .factory('nav', function() {
        var preUrl = angular.element('#appData').data('preurl');
        var self = {
          sections:  [
            {
                name: 'Home',
                url: preUrl+'/',
                type: 'link'
            },
            {
                name: 'Data grid',
                type: 'heading',
                children: [
                  {
                    name: 'Options',
                    type: 'toggle',
                    pages: [{
                        name: 'Selector',
                        url: preUrl+'/selector-grid',
                        type: 'link'
                      },
                      {
                        name : 'Search',
                        url: preUrl+'/search-grid',
                        type: 'link'
                      },
                      {
                        name : 'All',
                        url: preUrl+'/grid',
                        type: 'link'
                      }]
                  },
                ]
            },
          ],
          toggleOpenSection: function(section) {
            self.openSection = (self.openSection === section ? null : section);
          },
          isSectionOpen: function(section) {
            return self.openSection === section;
          },
          selectPage: function(section, page) {
            self.openSection = section;
            self.selectedPage = page;
          },
          isPageSelected: function(page) {
            return self.selectedPage === page;
          }
      }
      return self;
  });

})();
