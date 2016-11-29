(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .component('articleActions', articleActions());

  function articleActions() {
    var component = {
      templateUrl: '/article/app/article/actions/article-actions.html',
      controller: 'articleActionsController',
      controllerAs: 'ctrl',
      bindings: {
        article: '='
      }
    };

    return component;
  }
})();
