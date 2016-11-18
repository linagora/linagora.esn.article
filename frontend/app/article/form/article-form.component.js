(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .component('articleForm', articleForm());

    function articleForm() {
      var component = {
        templateUrl: '/article/app/article/form/article-form.html',
        controller: 'articleFormController',
        controllerAs: 'ctrl',
        bindings: {
          article: '=',
          formName: '@?',
          form: '=?'
        }
      };

      return component;
    }
})();
