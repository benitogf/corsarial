'use strict'

var Quill = window.Quill = require('quill')
require('quill-image-drop-module/image-drop.min')

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
      maxLength: '@'
    },
    link: quillLink
  }

  function quillLink (scope, element) {
    var toolbarOptions = [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ]

    scope.quill = new Quill(element.find('.editor').get(0), {
      theme: 'snow',
      modules: {
        imageDrop: true,
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
