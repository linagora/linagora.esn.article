(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .controller('articleFormController', articleFormController);

    function articleFormController($scope, $timeout) {
      var self = this;

      $scope.article = self.article;
      self.formName = self.formName || 'form';
      $timeout(function() {
        self.form = $scope[self.formName];
      }, 0);
    }
})();
