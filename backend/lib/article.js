'use strict';

const CONSTANTS = require('./constants');

module.exports = function(dependencies) {
  const mongoose = dependencies('db').mongo.mongoose;
  const Article = mongoose.model('Article');
  const pubsub = dependencies('pubsub').local;

  return {
    create,
    list
  };

  function create(article) {
    return Article.create(article).then(created => {
      pubsub.topic(CONSTANTS.NOTIFICATIONS.CREATED).publish(created);

      return created;
    });
  }

  function list(options = {}) {
    options.limit = +options.limit || CONSTANTS.DEFAULT_LIMIT;
    options.offset = +options.offset || CONSTANTS.DEFAULT_OFFSET;

    return Article.find().count().then(total_count => {
      let articleQuery = Article.find().skip(+options.offset || 0);

      if (options.limit > 0) {
        articleQuery = articleQuery.limit(options.limit);
      }

      return articleQuery.sort('-timestamps.created_at').populate('creator', CONSTANTS.SKIP_FIELDS.USER).then(list => ({list, total_count}));
    });
  }
};
