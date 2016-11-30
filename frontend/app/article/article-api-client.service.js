(function() {
  'use strict';

  angular.module('linagora.esn.article')
         .factory('articleApiClientService', articleApiClientService);

  function articleApiClientService(articleRestangular) {
    return {
      createArticle: createArticle,
      getArticle: getArticle,
      getArticles: getArticles,
      updateArticle: updateArticle,
      updateArticleStatus: updateArticleStatus
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

    function updateArticle(articleId, title, content) {
      return _getRoot().one(articleId).customPUT({title: title, content: content});
    }

    function updateArticleStatus(articleId, status) {
      return _getRoot().one(articleId).one('status').customPUT({value: status});
    }
  }
})();
