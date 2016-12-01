(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .component('articleAddSubheader', articleAddSubheader());

  function articleAddSubheader() {
    var component = {
      templateUrl: '/article/app/article/add/article-add-subheader.html',
      controllerAs: 'ctrl',
      bindings: {
        createArticle: '&',
        form: '<'
      }
    };

    return component;
  }

})();
