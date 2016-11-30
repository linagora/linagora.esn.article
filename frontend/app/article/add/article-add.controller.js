(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .controller('articleAddController', articleAddController);

    function articleAddController($log, $state, articleApiClientService, notificationFactory, session) {
      var self = this;

      self.article = {};
      self.createArticle = createArticle;
      self.user = session.user;

      function createArticle() {
       if (self.form && self.form.$invalid) {
         return;
       }

       articleApiClientService.createArticle(self.article).then(function() {
         notificationFactory.weakSuccess('success', 'Article successfuly created');
         $state.go('article.article-list');
       }, function(err) {
         $log.error('Error while creating article', err);
         notificationFactory.weakError('error', 'Error while creating article');
       });
     }
   }
})();
