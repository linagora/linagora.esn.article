(function() {
  'use strict';

  angular
    .module('linagora.esn.article')
    .constant('ARTICLE_OBJECT_TYPE', 'esn.article')
    .constant('ARTICLE_STATUS', {open: 'open', closed: 'closed'});
})();
