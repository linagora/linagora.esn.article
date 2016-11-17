(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .factory('articleRestangular', articleRestangular);

  function articleRestangular(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('/article/api');
      RestangularConfigurer.setFullResponse(true);
    });
  }
})();
