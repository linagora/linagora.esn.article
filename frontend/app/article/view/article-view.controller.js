(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .controller('articleViewController', articleViewController);

   function articleViewController($stateParams, articleApiClientService, articleMessageParser, ARTICLE_OBJECT_TYPE, ARTICLE_STATUS) {
     var self = this;

     self.ARTICLE_OBJECT_TYPE = ARTICLE_OBJECT_TYPE;
     self.ARTICLE_STATUS = ARTICLE_STATUS;
     self.comments = 0;
     self.onLiked = onLiked;
     self.onUnliked = onUnliked;
     self.liked = false;
     self.likes = 0;
     self.streams = [];
     self.writable = true;
     self.$onInit = $onInit;

     function $onInit() {
       if ($stateParams.article) {
         self.article = $stateParams.article;
         init();

         return;
       }

       return articleApiClientService.getArticle($stateParams.articleId).then(function(result) {
         self.article = result.data;
         init();
       });
     }

     function init() {
       if (!self.article.parsed) {
         self.article.parsed = articleMessageParser.full(self.article.content);
       }

       self.comments = self.article.stats.comments.size;
       self.likes = self.article.stats.likes.size || 0;
       self.liked = self.article.stats.likes.me || false;
     }

     function onLiked() {
       self.likes++;
       self.liked = true;
     }

     function onUnliked() {
       self.likes--;
       self.liked = false;
     }
   }
})();
