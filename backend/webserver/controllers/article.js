'use strict';

module.exports = function(dependencies, lib) {

  const logger = dependencies('logger');

  return {
    create,
    getArticles
  };

  function create(req, res) {
    const article = req.body;

    article.creator = req.user;
    lib.article.create(article).then(result => {
      res.status(201).json(result);
    }, err => {
      logger.error('Error while creating article', err);

      if (err.name.match(/ValidationError/)) {
        return res.status(400).json({error: {code: 400, message: 'Bad request', details: 'Missing required parameters to create article'}});
      }

      res.status(500).json({error: {code: 500, message: 'Server error', details: err.message}});
    });
  }

  function getArticles(req, res) {
    lib.article.list(req.query).then(result => {
      res.header('X-ESN-Items-Count', result.total_count || 0);
      res.status(200).json(result.list);
    }, err => {
      logger.error('Error while getting articles', err);
      res.status(500).json({error: {code: 500, message: 'Server error', details: err.message}});
    });
  }

};
