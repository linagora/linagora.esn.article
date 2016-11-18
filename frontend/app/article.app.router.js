(function() {
  'use strict';

  angular.module('linagora.esn.article')
  .config(function($stateProvider) {
    $stateProvider
      .state('article', {
        url: '/article',
        views: {
          '': {
            templateUrl: '/article/app/home/article-home.html'
          }
        },
        deepStateRedirect: {
          default: 'article.article-list',
          fn: function() {
            return { state: 'article.article-list' };
          }
        }
      })
      .state('article.article-list', {
        url: '/articles/list',
        views: {
          'main@article': {
            template: '<article-list/>'
          }
        }
      })
      .state('article.article-add', {
        url: '/articles/add',
        views: {
          'main@article': {
            template: '<article-add />'
          }
        }
      })
      .state('article.article-view', {
        url: '/articles/:articleId',
        params: {
          article: null
        },
        views: {
          'main@article': {
            template: '<article-view />'
          }
        }
      });
  });
})();
