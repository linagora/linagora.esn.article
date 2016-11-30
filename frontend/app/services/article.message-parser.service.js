(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .factory('articleMessageParser', articleMessageParser);

  function articleMessageParser($filter) {

    return {
      full: full,
      simple: simple
    };

    function full(text) {
      return simple(text);
    }

    function simple(text) {
      var parsedText = $filter('linky')(text, '_blank');

      return parsedText;
    }

  }
})();
