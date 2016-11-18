(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .component('articleListItemHeader', articleListItemHeader());

  function articleListItemHeader() {
    var component = {
      templateUrl: '/article/app/article/list/article-list-item-header.html',
      controller: 'articleListItemHeaderController',
      controllerAs: 'ctrl',
      bindings: {
        article: '='
      }
    };

    return component;
  }
})();
