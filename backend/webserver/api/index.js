'use strict';

const express = require('express');

module.exports = function(dependencies, lib) {

  const router = express.Router();

  require('../middlewares/activitystream')(dependencies, lib);
  require('./article')(dependencies, lib, router);

  return router;
};
