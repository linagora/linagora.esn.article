'use strict';

const CONSTANTS = require('../../lib/constants');

module.exports = function(dependencies, lib) {

  const logger = dependencies('logger');

  return {
    canUpdate,
    isCreator,
    load
  };

  function canUpdate(req, res, next) {
    if (req.article.status !== CONSTANTS.STATUS.closed) {
      return next();
    }

    return res.status(403).json({error: {code: 403, message: 'Forbidden', details: `You can not update the article ${req.params.id}`}});
  }

  function isCreator(req, res, next) {
    if (!req.user._id.equals(req.article.creator._id)) {
      return res.status(403).json({error: {code: 403, message: 'Forbidden', details: `You are not the creator of article ${req.params.id}`}});
    }
    next();
  }

  function load(req, res, next) {
    lib.article.getById(req.params.id).then(article => {
      if (!article) {
        return res.status(404).json({error: {code: 404, message: 'Not found', details: `Can not find article ${req.params.id}`}});
      }

      req.article = article;
      next();

    }, err => {
      const error = 'Error while loading article';

      logger.error(error, err);
      res.status(500).json({error: {code: 500, message: 'Server error', details: error}});
    });
  }
};
