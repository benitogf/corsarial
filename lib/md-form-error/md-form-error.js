'use strict'

angular
    .module('mdFormError', [])
    .directive('mdFormError', formError)

/* @ngInject */
function formError () {
  var directive = {
    restrict: 'A',
    require: '^form',
    link: link
  }

  return directive

  function link (scope, elem, attrs, formCtrl) {
    // http://blog.yodersolutions.com/bootstrap-form-validation-done-right-in-angularjs/
    // http://bahmutov.calepin.co/sharing-data-between-controller-and-link-functions-in-angular-directive.html
    // attach the watchers to the form controller
    if (!formCtrl.errorWatcher) {
      formCtrl.errorWatcher = {}
    }

    // find the input element, which has the 'name' attribute
    var inputEl = elem[0].querySelector('[name]')
    var inputNgEl
    var inputName

    // convert the native input element to an angular element
    inputNgEl = angular.element(inputEl)

    // get the name on input so we know the property to check
    // on the form controller
    inputName = inputNgEl.attr('name')

    scope.$on('show-form-errors', function () {
      // this activates ng-messages
      formCtrl[inputName].$touched = true
    })
  }
}
