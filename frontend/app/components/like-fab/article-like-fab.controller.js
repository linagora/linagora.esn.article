(function() {
  'use strict';

  angular.module('linagora.esn.article')
    .controller('articleLikeFabController', articleLikeFabController);

   function articleLikeFabController(articleLikeAPI) {
     var self = this;

     self.switchLike = switchLike;
     self.$onInit = $onInit;

     function like() {
       self.liked = true;
       articleLikeAPI.like(self.article._id).then(function() {
         self.onLiked && self.onLiked();
       }).catch(function() {
         self.liked = false;
       });
     }

     function unlike() {
       self.liked = false;
       articleLikeAPI.unlike(self.article._id).then(function() {
         self.onUnliked && self.onUnliked;
       }).catch(function() {
         self.liked = true;
       });
     }

     function switchLike() {
       if (self.liked) {
         return unlike();
       }

       like();
     }

     function $onInit() {
       self.liked = self.article.stats.likes.me;
     }
   }
})();
