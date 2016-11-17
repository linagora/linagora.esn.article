'use strict';

const readingTime = require('reading-time');

module.exports = function() {
  return function(article) {
    if (typeof article.toObject === 'function') {
      article = article.toObject();
    }
    // needed for activity_streams
    article.writable = true;

    const reading = readingTime(article.content);

    reading.minutes = Math.ceil(reading.minutes.toFixed(2));
    article.stats = {
      reading
    };

    return Promise.resolve(article);
  };
};
