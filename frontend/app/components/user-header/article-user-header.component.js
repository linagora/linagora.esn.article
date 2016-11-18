(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .component('articleUserHeader', articleUserHeader());

  function articleUserHeader() {
    var component = {
      templateUrl: '/article/app/components/user-header/article-user-header.html',
      controller: 'articleUserHeaderController',
      controllerAs: 'ctrl',
      bindings: {
        user: '='
      }
    };

    return component;
  }
})();
