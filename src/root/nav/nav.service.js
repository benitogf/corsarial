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
          selectSection: function(section) {
            self.openedSection = section;
          },
          toggleSelectSection: function(section) {
            self.openedSection = (self.openedSection === section ? null : section);
          },
          isSectionSelected: function(section) {
            return self.openedSection === section;
          },

          selectPage: function(section, page) {
            self.currentSection = section;
            self.currentPage = page;
          },
          isPageSelected: function(page) {
            return self.currentPage === page;
          }
      }
      return self;
  });

})();
