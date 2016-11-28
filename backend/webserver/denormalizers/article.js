'use strict';

const readingTime = require('reading-time');
const truncate = require('truncate');
const Q = require('q');

module.exports = function(lib) {
  return function(article) {
    if (typeof article.toObject === 'function') {
      article = article.toObject();
    }

    article.stats = {
      likes: {size: 0},
      comments: {size: 0}
    };

    // needed for activity_streams
    article.writable = true;
    article.summary = truncate(article.content, 400);

    const reading = readingTime(article.content);

    reading.minutes = Math.ceil(reading.minutes.toFixed(2));
    article.stats.reading = reading;

    return Q.allSettled([lib.article.getNbOfComments(article._id), lib.article.getNbOfLikes(article._id)]).spread((comments, likes) => {
      if (comments.state === 'fulfilled') {
        article.stats.comments.size = comments.value || 0;
      }

      if (likes.state === 'fulfilled') {
        article.stats.likes.size = likes.value || 0;
      }

      return article;
    });
  };
};
