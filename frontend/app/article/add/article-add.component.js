(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .component('articleAdd', articleAdd());

    function articleAdd() {
      var component = {
        templateUrl: '/article/app/article/add/article-add.html',
        controller: 'articleAddController',
        controllerAs: 'ctrl'
      };

      return component;
    }
})();
