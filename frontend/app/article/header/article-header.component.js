(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .component('articleHeader', articleHeader());

  function articleHeader() {
    var component = {
      templateUrl: '/article/app/article/header/article-header.html',
      controller: 'articleHeaderController',
      controllerAs: 'ctrl',
      bindings: {
        article: '='
      }
    };

    return component;
  }
})();
