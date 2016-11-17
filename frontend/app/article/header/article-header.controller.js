(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .controller('articleHeaderController', articleHeaderController);

   function articleHeaderController(userUtils) {
     var self = this;

     self.authorName = userUtils.displayNameOf(self.article.creator);
   }
})();
