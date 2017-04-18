(function() {
  'use strict';

  angular
    .module('linagora.esn.article')
    .directive('articleApplicationMenu', articleApplicationMenu);

  function articleApplicationMenu(applicationMenuTemplateBuilder) {
    var directive = {
      restrict: 'E',
      replace: true,
      template: applicationMenuTemplateBuilder('/#/article', { url: '/article/images/articles-icon.svg' }, 'Articles')
    };

    return directive;
  }
})();
