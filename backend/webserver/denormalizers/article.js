'use strict';

module.exports = function() {
  return function(article) {
    if (typeof article.toObject === 'function') {
      article = article.toObject();
    }
    // needed for activity_streams
    article.writable = true;

    return Promise.resolve(article);
  };
};
