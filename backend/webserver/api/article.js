'use strict';

module.exports = function(dependencies, lib, router) {

  const authorizationMW = dependencies('authorizationMW');
  const controller = require('../controllers/article')(dependencies, lib);

  router.get('/articles',
    authorizationMW.requiresAPILogin,
    controller.getArticles);
};
