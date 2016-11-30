'use strict';

const CONSTANTS = require('./constants');
const OBJECT_TYPE = CONSTANTS.OBJECT_TYPE;

module.exports = function(dependencies) {
  const mongoose = dependencies('db').mongo.mongoose;
  const Article = mongoose.model('Article');
  const TimelineEntry = mongoose.model('TimelineEntry');
  const pubsub = dependencies('pubsub').local;
  const like = dependencies('like');

  return {
    collaborationHook,
    create,
    getById,
    getNbOfComments,
    getNbOfLikes,
    list,
    update
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

  function getById(id) {
    return Article.findById(id).populate('creator', CONSTANTS.SKIP_FIELDS.USER);
  }

  function getNbOfComments(id) {
    function countComments(article) {
      if (!article) {
        return 0;
      }

      const query = {
        target: {
          objectType: 'activitystream',
          _id: article.activity_stream.uuid
        }
      };

      return TimelineEntry.find(query).count();
    }

    return getById(id).then(countComments);
  }

  function getNbOfLikes(id) {
    return like.getNbOfLikes({id: String(id), objectType: OBJECT_TYPE});
  }

  function list(options = {}) {
    options.limit = +options.limit || CONSTANTS.DEFAULT_LIMIT;
    options.offset = +options.offset || CONSTANTS.DEFAULT_OFFSET;

    return Article.find().count().then(total_count => {
      let articleQuery = Article.find().skip(+options.offset || 0);

      if (options.limit > 0) {
        articleQuery = articleQuery.limit(options.limit);
      }

      return articleQuery.sort('-timestamps.creation').populate('creator', CONSTANTS.SKIP_FIELDS.USER).then(list => ({list, total_count}));
    });
  }

  function update(article) {
    return Article.findOneAndUpdate({_id: article._id}, article, {new: true});
  }
};
