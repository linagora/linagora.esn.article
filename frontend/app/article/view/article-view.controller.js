(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .controller('articleViewController', articleViewController);

   function articleViewController($stateParams, articleApiClientService, ARTICLE_OBJECT_TYPE, ARTICLE_STATUS) {
     var self = this;

     self.ARTICLE_OBJECT_TYPE = ARTICLE_OBJECT_TYPE;
     self.ARTICLE_STATUS = ARTICLE_STATUS;
     self.streams = [];
     self.writable = true;

     getArticle();

     function getArticle() {
       if ($stateParams.article) {
         self.article = $stateParams.article;

         return;
       }

       return articleApiClientService.getArticle($stateParams.articleId).then(function(result) {
         self.article = result.data;
       });
     }
   }
})();
