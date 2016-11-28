(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .component('articleListItem', articleListItem());

  function articleListItem() {
    var component = {
      templateUrl: '/article/app/article/list/article-list-item.html',
      controller: 'articleListItemController',
      controllerAs: 'ctrl',
      bindings: {
        article: '='
      }
    };

    return component;
  }
})();
