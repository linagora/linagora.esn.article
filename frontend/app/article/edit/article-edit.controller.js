(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .controller('articleEditController', articleEditController);

   function articleEditController($log, $state, $stateParams, articleApiClientService, notificationFactory, session) {
     var self = this;

     self.updateArticle = updateArticle;
     self.user = session.user;
     self.$onInit = $onInit;

     function updateArticle() {
       if (self.form && self.form.$invalid) {
         return;
       }

       articleApiClientService.updateArticle(self.article._id, self.article.title, self.article.content).then(function() {
         notificationFactory.weakSuccess('success', 'Article has been updated');
         $state.go('article.article-view', {articleId: self.article._id});
       }, function(err) {
         $log.error('Error while updating article', err);
         notificationFactory.weakError('error', 'Error while updating article');
       });
     }

     function $onInit() {
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
