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
          default: 'article.home',
          fn: function() {
            return { state: 'article.home' };
          }
        }
      })
      .state('article.home', {
        url: '/home',
        views: {
          'main@article': {
            templateUrl: '/article/app/home/article-main.html'
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
