(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .component('articleEditSubheader', articleEditSubheader());

  function articleEditSubheader() {
    var component = {
      templateUrl: '/article/app/article/edit/article-edit-subheader.html',
      controllerAs: 'ctrl',
      bindings: {
        updateArticle: '&',
        form: '<',
        article: '='
      }
    };

    return component;
  }

})();
