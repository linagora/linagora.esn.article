(function() {
  'use strict';

  angular.module('linagora.esn.article')
         .factory('articleApiClientService', articleApiClientService);

  function articleApiClientService(articleRestangular) {
    return {
      getArticle: getArticle
    };

    function getArticle(articleId) {
      return articleRestangular.all('articles').one(articleId).get();
    }
  }
})();
