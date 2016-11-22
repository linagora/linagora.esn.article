(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .controller('articleUserHeaderController', articleUserHeaderController);

   function articleUserHeaderController(userUtils) {
     var self = this;

     self.userName = userUtils.displayNameOf(self.user);
   }
})();
