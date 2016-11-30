(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .controller('articleViewController', articleViewController);

   function articleViewController($stateParams, articleApiClientService, articleMessageParser, ARTICLE_OBJECT_TYPE, ARTICLE_STATUS) {
     var self = this;

     self.ARTICLE_OBJECT_TYPE = ARTICLE_OBJECT_TYPE;
     self.ARTICLE_STATUS = ARTICLE_STATUS;
     self.streams = [];
     self.writable = true;
     self.$onInit = getArticle;

     function getArticle() {
       if ($stateParams.article) {
         self.article = $stateParams.article;
         parseContent();

         return;
       }

       return articleApiClientService.getArticle($stateParams.articleId).then(function(result) {
         self.article = result.data;
         parseContent();
       });
     }

     function parseContent() {
       if (!self.article.parsed) {
         self.article.parsed = articleMessageParser.full(self.article.content);
       }
     }
   }
})();
