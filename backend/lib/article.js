'use strict';

const CONSTANTS = require('./constants');
const OBJECT_TYPE = CONSTANTS.OBJECT_TYPE;

module.exports = function(dependencies) {
  const mongoose = dependencies('db').mongo.mongoose;
  const Article = mongoose.model('Article');
  const pubsub = dependencies('pubsub').local;

  return {
    collaborationHook,
    create,
    list
  };

  function collaborationHook() {
    var collaboration = dependencies('collaboration');

    return {
      create,
      getFromActivityStreamID,
      getStreamsForUser,
      query,
      queryOne
    };

    function articleToStream(article) {
      return {
        uuid: article.activity_stream.uuid,
        target: {
          objectType: OBJECT_TYPE,
          _id: article._id,
          displayName: article.title,
          id: `urn:linagora.com:${OBJECT_TYPE}:${article._id}`
        }
      };
    }

    function query(q, callback) {
      return collaboration.query(OBJECT_TYPE, q, callback);
    }

    function queryOne(q, callback) {
      return collaboration.queryOne(OBJECT_TYPE, q, callback);
    }

    function getFromActivityStreamID(uuid, callback) {
      collaboration.queryOne(OBJECT_TYPE, {'activity_stream.uuid': uuid}, callback);
    }

    function getStreamsForUser(userId, options, callback) {
      list({limit: -1}).then(articles => callback(null, articles.list.map(articleToStream)), callback);
    }
  }

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
