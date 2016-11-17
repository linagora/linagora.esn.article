(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .component('articleView', articleView());

  function articleView() {
    var component = {
      templateUrl: '/article/app/article/view/article-view.html',
      controller: 'articleViewController',
      controllerAs: 'ctrl'
    };

    return component;
  }
})();
