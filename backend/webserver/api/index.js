'use strict';

const express = require('express');

module.exports = function(dependencies, lib) {

  const router = express.Router();
  const resourceLinkMiddleware = dependencies('resourceLinkMW');
  const articleMW = require('../middlewares/article')(dependencies, lib);

  require('../middlewares/activitystream')(dependencies, lib);
  require('./article')(dependencies, lib, router);

  resourceLinkMiddleware.addCanCreateMiddleware('like', articleMW.canLike);

  return router;
};
