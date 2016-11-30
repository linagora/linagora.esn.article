(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .component('articleEdit', articleEdit());

  function articleEdit() {
    var component = {
      templateUrl: '/article/app/article/edit/article-edit.html',
      controller: 'articleEditController',
      controllerAs: 'ctrl'
    };

    return component;
  }
})();
