(function() {
  'use strict';

  angular.module('linagora.esn.article')
         .component('articleSubheader', articleSubheader());

  function articleSubheader() {
    var component = {
      templateUrl: '/article/app/home/article-subheader.html'
    };

    return component;
  }
})();
