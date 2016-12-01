(function() {
  'use strict';

  angular.module('linagora.esn.article')
         .component('articleSubheaderButton', articleSubheaderButton());

  function articleSubheaderButton() {
    var component = {
      templateUrl: '/article/app/components/subheader-button/article-subheader-button.html',
      bindings: {
        articleDisabled: '=?',
        articleClick: '&?',
        articleIconClass: '@?',
        articleIconText: '@?',
        articleIconPosition: '@?'
      },
      controllerAs: 'ctrl'
    };

    return component;
  }

})();
