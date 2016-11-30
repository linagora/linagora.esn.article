'use strict';

module.exports = function(dependencies, lib) {

  const logger = dependencies('logger');
  const denormalize = require('../denormalizers/article')(lib);

  return {
    create,
    get,
    getArticles,
    update,
    updateStatus
  };

  function create(req, res) {
    const article = req.body;

    article.creator = req.user;
    lib.article.create(article)
      .then(denormalize.bind(null, req.user))
      .then(result => res.status(201).json(result))
      .catch(err => {
        logger.error('Error while creating article', err);

        if (err.name.match(/ValidationError/)) {
          return res.status(400).json({error: {code: 400, message: 'Bad request', details: 'Missing required parameters to create article'}});
        }

        res.status(500).json({error: {code: 500, message: 'Server error', details: err.message}});
      });
  }

  function get(req, res) {
    denormalize(req.user, req.article).then(result => res.status(200).json(result));
  }

  function getArticles(req, res) {
    lib.article.list(req.query)
      .then(denormalizeList)
      .then(denormalized => {
        res.header('X-ESN-Items-Count', denormalized.total_count || 0);
        res.status(200).json(denormalized.list);
      }).catch(err => {
        logger.error('Error while getting articles', err);
        res.status(500).json({error: {code: 500, message: 'Server error', details: err.message}});
      });

    function denormalizeList(result) {
      return Promise.all(result.list.map(denormalize.bind(null, req.user))).then(denormalized => ({total_count: result.total_count, list: denormalized}));
    }
  }

  function update(req, res) {
    lib.article.update(req.article._id, req.body.title, req.body.content)
      .then(denormalize.bind(null, req.user))
      .then(result => res.status(200).json(result))
      .catch(err => {
        logger.error('Error while updating article', err);
        res.status(500).json({error: {code: 500, message: 'Server error', details: err.message}});
      });
  }

  function updateStatus(req, res) {
    const article = req.article;

    article.status = req.body.value;
    lib.article.update(article)
      .then(denormalize.bind(null, req.user))
      .then(result => res.status(200).json(result))
      .catch(err => {
        logger.error('Error while updating article', err);
        res.status(500).json({error: {code: 500, message: 'Server error', details: err.message}});
      });
  }
};
