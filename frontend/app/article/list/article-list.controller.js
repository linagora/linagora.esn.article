(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .controller('articleListController', articleListController);

   function articleListController(ArticleListPaginationProviderService, infiniteScrollHelperBuilder, PageAggregatorService, _) {
     var self = this;
     var aggregator;

     self.articles = [];
     self.loadNext = infiniteScrollHelperBuilder(self, loadNextItems, addArticles, 10);

    function addArticles(elements) {
      Array.prototype.push.apply(self.articles, elements);
    }

    function load() {
      return aggregator.loadNextItems().then(_.property('data'), _.constant([]));
    }

    function loadNextItems() {
      if (aggregator) {
        return load();
      }

      var provider = new ArticleListPaginationProviderService();

      aggregator = new PageAggregatorService('ArticleListControllerAggregator', [provider], {
        results_per_page: 10
      });

      return load();
    }
  }
})();
