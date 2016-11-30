(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .factory('articleLikeAPI', articleLikeAPI);

  function articleLikeAPI(ResourceLinkAPI, session, ARTICLE_OBJECT_TYPE, LIKE_LINK_TYPE) {

    return {
      like: like,
      unlike: unlike
    };

    function _getSource() {
      return {
        objectType: 'user',
        id: session.user._id
      };
    }

    function _getTarget(articleId) {
      return {
        objectType: ARTICLE_OBJECT_TYPE,
        id: articleId
      };
    }

    function like(articleId) {
      return ResourceLinkAPI.create(_getSource(), _getTarget(articleId), LIKE_LINK_TYPE);
    }

    function unlike(articleId) {
      return ResourceLinkAPI.remove(_getSource(), _getTarget(articleId), LIKE_LINK_TYPE);
    }

  }
})();
