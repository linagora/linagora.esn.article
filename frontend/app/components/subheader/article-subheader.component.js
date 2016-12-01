(function() {
  'use strict';

  angular.module('linagora.esn.article')
         .component('articleSubheader', articleSubheader());

  function articleSubheader() {
    var component = {
      templateUrl: '/article/app/components/subheader/article-subheader.html'
    };

    return component;
  }

})();
