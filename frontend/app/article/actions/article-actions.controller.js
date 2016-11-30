(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .controller('articleActionsController', articleActionsController);

   function articleActionsController($log, $state, articleApiClientService, notificationFactory, session, ARTICLE_STATUS) {
     var self = this;

     self.$onInit = $onInit;
     self.ARTICLE_STATUS = ARTICLE_STATUS;
     self.close = close;
     self.edit = edit;
     self.isCreator = isCreator;
     self.open = open;

     function $onInit() {
       self.status = self.article.status || ARTICLE_STATUS.open;
     }

     function close() {
       articleApiClientService.updateArticleStatus(self.article._id, ARTICLE_STATUS.closed).then(function() {
         self.status = ARTICLE_STATUS.closed;
         notificationFactory.weakSuccess('success', 'Article is now closed');
       }, function(err) {
         $log.debug('Error while closing article', err);
         notificationFactory.weakError('error', 'Error while closing article');
       });
     }

     function edit() {
       $state.go('article.article-edit', {articleId: self.article._id});
     }

     function isCreator() {
       return self.article.creator._id === session.user._id;
     }

     function open() {
       articleApiClientService.updateArticleStatus(self.article._id, ARTICLE_STATUS.open).then(function() {
         self.status = ARTICLE_STATUS.open;
         notificationFactory.weakSuccess('success', 'Article is now open');
       }, function(err) {
         $log.debug('Error while opening article', err);
         notificationFactory.weakError('error', 'Error while opening article');
       });
     }
   }
})();
