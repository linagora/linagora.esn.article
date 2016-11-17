(function() {
  'use strict';

  angular
    .module('linagora.esn.article')
    .directive('articleApplicationMenu', articleApplicationMenu);

  function articleApplicationMenu(applicationMenuTemplateBuilder) {
    var directive = {
      restrict: 'E',
      replace: true,
      template: applicationMenuTemplateBuilder('/#/article', 'mdi-pen', 'Articles')
    };

    return directive;
  }
})();
