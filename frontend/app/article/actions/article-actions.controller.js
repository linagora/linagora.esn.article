(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .controller('articleActionsController', articleActionsController);

   function articleActionsController($log, articleApiClientService, session, ARTICLE_STATUS) {
     var self = this;

     self.$onInit = $onInit;
     self.ARTICLE_STATUS = ARTICLE_STATUS;
     self.close = close;
     self.isCreator = isCreator;
     self.open = open;

     function $onInit() {
       self.status = self.article.status || ARTICLE_STATUS.open;
     }

     function close() {
       articleApiClientService.updateArticleStatus(self.article._id, ARTICLE_STATUS.closed).then(function() {
         self.status = ARTICLE_STATUS.closed;
         $log.debug('Article has been closed');
       }, function(err) {
         $log.debug('Error while closing article', err);
       });
     }

     function isCreator() {
       return self.article.creator._id === session.user._id;
     }

     function open() {
       articleApiClientService.updateArticleStatus(self.article._id, ARTICLE_STATUS.open).then(function() {
         self.status = ARTICLE_STATUS.open;
         $log.debug('Article has been opened');
       }, function(err) {
         $log.debug('Error while opening article', err);
       });
     }
   }
})();
