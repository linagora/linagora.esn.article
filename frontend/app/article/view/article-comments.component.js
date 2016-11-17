(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .component('articleComments', articleComments());

  function articleComments() {
    var component = {
      templateUrl: '/article/app/article/view/article-comments.html',
      bindings: {
        streamable: '='
      }
    };

    return component;
  }
})();
