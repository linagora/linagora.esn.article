(function() {
  'use strict';

  angular.module('linagora.esn.article')
         .factory('ArticleListPaginationProviderService', articleListPaginationProviderService);

  function articleListPaginationProviderService(articleApiClientService) {

    function ArticleListPaginationProvider(options) {
      this.options = angular.extend({limit: 10, offset: 0}, {}, options);
    }

    ArticleListPaginationProvider.prototype.loadNextItems = function() {
      var self = this;

      return articleApiClientService.getArticles(self.options).then(function(response) {
        var result = {
          data: response.data,
          lastPage: (response.data.length < self.options.limit)
        };

        if (!result.lastPage) {
          self.options.offset += self.options.limit;
        }

        return result;
      });
    };

    return ArticleListPaginationProvider;
  }
})();
