'use strict';

const CONSTANTS = require('../../lib/constants');

module.exports = function(dependencies, lib) {

  const logger = dependencies('logger');

  return {
    canLike,
    canUpdate,
    isCreator,
    load
  };

  function canLike(req, res, next) {
    const link = req.link;

    logger.debug('Check the article like link', link);

    if (link.target.objectType !== CONSTANTS.OBJECT_TYPE) {
      return next();
    }

    if (!req.user._id.equals(link.source.id)) {
      return res.status(400).json({error: {code: 400, message: 'Bad Request', details: 'You can not like an article for someone else'}});
    }

    lib.article.getById(link.target.id).then(article => {
      if (!article) {
        logger.error('Can not find the article to like');

        return res.status(400).json({error: {code: 400, message: 'Bad Request', details: 'Can not find article to like'}});
      }

      return lib.article.isLikedByUser(article._id, req.user).then(result => {
        if (result) {
          return res.status(400).json({error: {code: 400, message: 'Bad Request', details: 'Article is already liked by user'}});
        }

        req.linkable = true;
        next();
      });

    }).catch(err => {
      logger.error('Error while checking if article is already liked by user', err);

      return res.status(500).json({error: {code: 500, message: 'Server Error', details: 'Can not check if user already liked the article'}});
    });
  }

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
