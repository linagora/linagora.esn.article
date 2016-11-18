(function() {
  'use strict';

  angular.module('linagora.esn.article')
         .factory('articleApiClientService', articleApiClientService);

  function articleApiClientService(articleRestangular) {
    return {
      createArticle: createArticle,
      getArticle: getArticle,
      getArticles: getArticles
    };

    function createArticle(article) {
      return _getRoot().post(article);
    }

    function _getRoot() {
      return articleRestangular.all('articles');
    }

    function getArticle(articleId) {
      return _getRoot().one(articleId).get();
    }

    function getArticles(options) {
      return _getRoot().getList(options);
    }

  }
})();
