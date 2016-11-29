(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .controller('articleListItemController', articleListItemController);

   function articleListItemController(ARTICLE_OBJECT_TYPE, ARTICLE_STATUS) {
     var self = this;

     self.ARTICLE_OBJECT_TYPE = ARTICLE_OBJECT_TYPE;
     self.ARTICLE_STATUS = ARTICLE_STATUS;
   }
})();
