'use strict'

var Quill = require('quill')

angular.module('mdQuill', [])
.directive('mdQuill', quill)

function quill ($timeout) {
  var directive = {
    restrict: 'E',
    template: require('./md-quill.html'),
    scope: {
      ngModel: '=',
      name: '@',
      required: '@',
      maxlength: '@'
    },
    link: quillLink
  }

  function quillLink (scope, element) {
    var toolbarOptions = [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],

      ['blockquote', 'code-block'],

      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

      // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      ['clean']  // remove formatting button
    ]

    scope.quill = new Quill(element.find('.editor').get(0), {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions
      }
    })
    scope.required = (scope.required !== undefined)
    scope.quill.setContents(scope.ngModel.contents)
    scope.quill.on('editor-change', function () {
      var text = scope.quill.getText()
      var contents = scope.quill.getContents().ops
      if (!emptyText(text)) {
        scope.ngModel.text = text
        $(element.find('textarea').get(0)).val(text.slice(0, text.length - 1))
      } else {
        scope.ngModel.text = ''
        // https://github.com/angular/material/issues/1870
        $(element.find('textarea').get(0)).val('')
      }
      scope.ngModel.contents = contents
      scope.$apply()
    })
  }

  function emptyText (text) {
    var result = true
    var lines = text.split('\n')
    lines.forEach(function (line) {
      if (line !== '') {
        result = false
      }
    })
    return result
  }

  return directive
}
