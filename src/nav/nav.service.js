'use strict'

angular.module('app.nav')
    .factory('NavService', NavService)

function NavService ($rootScope) {
  var preUrl = $rootScope.preUrl = angular.element('#appData').data('preurl') || ''
  var self = {
    sections: [
      {
        name: 'NAV.HUBS',
        url: preUrl + '/',
        type: 'link'
      },
      {
        name: '',
        type: 'heading',
        children: [
          {
            name: 'NAV.NOTES',
            type: 'toggle',
            pages: [
              {
                name: 'NAV.NOTES.NEW',
                url: preUrl + '/notes/new',
                type: 'link'
              },
              {
                name: 'NAV.NOTES.SEARCH',
                url: preUrl + '/notes',
                type: 'link'
              }
            ]
          }
        ]
      }
    ],
    getPageByUrl: function (url) {
      self.openSection = null
      self.selectedPage = null
      _.forEach(self.sections, function (section) {
        if (section.url && section.url.replace(preUrl, '') === url) {
          self.selectedPage = section
        }
        if (section.children) {
          _.forEach(section.children, function (child) {
            _.forEach(child.pages, function (page) {
              if (page.url.replace(preUrl, '') === url) {
                self.openSection = child
                self.selectedPage = page
              }
            })
          })
        }
      })
      return self.selectedPage
    },
    toggleOpenSection: function (section) {
      self.openSection = (self.openSection === section ? null : section)
    },
    isSectionOpen: function (section) {
      return self.openSection === section
    },
    selectPage: function (section, page) {
      self.openSection = section
      self.selectedPage = page
    },
    isPageSelected: function (page) {
      return self.selectedPage === page
    }
  }
  return self
}
