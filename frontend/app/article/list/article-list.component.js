(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .component('articleList', articleList());

  function articleList() {
    var component = {
      templateUrl: '/article/app/article/list/article-list.html',
      controller: 'articleListController',
      controllerAs: 'ctrl'
    };

    return component;
  }
})();
