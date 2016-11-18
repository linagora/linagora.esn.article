(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .controller('articleAddController', articleAddController);

    function articleAddController($log, $state, articleApiClientService, session) {
      var self = this;

      self.article = {};
      self.createArticle = createArticle;
      self.user = session.user;

      function createArticle() {
       if (self.form && self.form.$invalid) {
         return;
       }

       articleApiClientService.createArticle(self.article).then(function() {
         $log.debug('Article created');
         $state.go('article.article-list');
       }, function(err) {
         $log.error('Error while creating article', err);
       });
     }
   }
})();
