(function() {
  'use strict';

  angular.module('linagora.esn.article')
         .factory('articleApiClientService', articleApiClientService);

  function articleApiClientService(articleRestangular) {
    return {
      getArticle: getArticle,
      getArticles: getArticles
    };

    function getArticle(articleId) {
      return articleRestangular.all('articles').one(articleId).get();
    }

    function getArticles(options) {
      return articleRestangular.all('articles').getList(options);
    }
  }
})();
