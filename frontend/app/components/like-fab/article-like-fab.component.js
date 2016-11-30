(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .component('articleLikeFab', articleLikeFab());

  function articleLikeFab() {
    var component = {
      templateUrl: '/article/app/components/like-fab/article-like-fab.html',
      controller: 'articleLikeFabController',
      controllerAs: 'ctrl',
      bindings: {
        article: '=',
        onLiked: '&',
        onUnliked: '&'
      }
    };

    return component;
  }
})();
