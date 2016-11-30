'use strict';

module.exports = function(dependencies, lib, router) {

  const authorizationMW = dependencies('authorizationMW');
  const articleMW = require('../middlewares/article')(dependencies, lib);
  const controller = require('../controllers/article')(dependencies, lib);

  router.get('/articles',
    authorizationMW.requiresAPILogin,
    controller.getArticles);

  router.get('/articles/:id',
    authorizationMW.requiresAPILogin,
    articleMW.load,
    controller.get);

  router.put('/articles/:id/status',
    authorizationMW.requiresAPILogin,
    articleMW.load,
    articleMW.isCreator,
    controller.updateStatus);

  router.post('/articles',
    authorizationMW.requiresAPILogin,
    controller.create);
};
