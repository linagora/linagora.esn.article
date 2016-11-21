'use strict';

const readingTime = require('reading-time');
const truncate = require('truncate');

module.exports = function() {
  return function(article) {
    if (typeof article.toObject === 'function') {
      article = article.toObject();
    }
    // needed for activity_streams
    article.writable = true;
    article.summary = truncate(article.content, 400);

    const reading = readingTime(article.content);
    const likes = {size: 0};
    const comments = {size: 0};

    reading.minutes = Math.ceil(reading.minutes.toFixed(2));
    article.stats = {
      reading,
      likes,
      comments
    };

    return Promise.resolve(article);
  };
};
