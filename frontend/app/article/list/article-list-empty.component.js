(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .component('articleListEmpty', articleListEmpty());

  function articleListEmpty() {
    var component = {
      templateUrl: '/article/app/article/list/article-list-empty.html'
    };

    return component;
  }
})();
