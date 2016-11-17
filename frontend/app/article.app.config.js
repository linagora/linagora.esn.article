(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .config(injectApplicationMenu);

  function injectApplicationMenu(dynamicDirectiveServiceProvider) {
    var articleItem = new dynamicDirectiveServiceProvider.DynamicDirective(true, 'article-application-menu', {priority: 35});

    dynamicDirectiveServiceProvider.addInjection('esn-application-menu', articleItem);
  }
})();
