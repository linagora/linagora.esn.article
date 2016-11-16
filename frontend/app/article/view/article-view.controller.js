(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .controller('articleViewController', articleViewController);

   function articleViewController($stateParams, articleApiClientService) {
     var self = this;

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
