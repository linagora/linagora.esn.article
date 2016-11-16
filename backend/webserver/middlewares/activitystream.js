'use strict';

const async = require('async');

module.exports = function(dependencies, lib) {

  const activitystreamMW = dependencies('activitystreamMW');

  activitystreamMW.addStreamResourceFinder(findArticleStreamResource);
  activitystreamMW.addStreamWritableFinder(findWritableArticleStreamResource);

  return {
    findArticleStreamResource,
    findWritableArticleStreamResource
  };

  function findArticleStreamResource(req, res, next) {
    var uuid = req.params.uuid;

    lib.article.collaborationHook().getFromActivityStreamID(uuid, (err, article) => {
      if (err) {
        return next(new Error('Error while searching the article stream resource : ' + err.message));
      }

      if (!article) {
        return next();
      }

      req.activity_stream = {
        objectType: 'activitystream',
        _id: uuid,
        target: {
          objectType: 'article',
          object: article
        }
      };
      next();
    });
  }

  function findWritableArticleStreamResource(req, res, next) {
    const inReplyTo = req.body.inReplyTo;
    const targets = req.body.targets;

    if (inReplyTo) {
      return next();
    }

    if (!targets || targets.length === 0) {
      return next();
    }

    async.filter(targets,
      function(item, callback) {
        lib.article.collaborationHook().getFromActivityStreamID(item.id, (err, article) => {
          if (err || !article) {
            return callback(null, false);
          }

          lib.permission.userCanWriteOnArticle(req.user, article).then(writable => callback(null, writable), () => callback(null, false));
        });
      },
      function(err, results) {
        if (err) {
          return next(err);
        }

        if (!results || results.length === 0) {
          return next();
        }

        if (!req.message_targets) {
          req.message_targets = [];
        }

        req.message_targets = req.message_targets.concat(results);
        next();
      }
    );
  }
};
