(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .controller('articleListController', articleListController);

   function articleListController(articleApiClientService) {
     var self = this;

     fetchArticles();

     function fetchArticles() {
      articleApiClientService.getArticles().then(function(result) {
        self.articles = result.data;
      });
    }
  }
})();
