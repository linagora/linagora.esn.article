(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .component('articleViewSubheader', articleViewSubheader());

  function articleViewSubheader() {
    var component = {
      templateUrl: '/article/app/article/view/article-view-subheader.html',
      controllerAs: 'ctrl',
      bindings: {
        article: '='
      }
    };

    return component;
  }

})();
