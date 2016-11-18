(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .controller('articleListItemHeaderController', articleListItemHeaderController);

   function articleListItemHeaderController(userUtils) {
     var self = this;

     self.authorName = userUtils.displayNameOf(self.article.creator);
   }
})();
