'use strict';

const express = require('express');

module.exports = function(dependencies, lib) {

  const router = express.Router();

  require('./article')(dependencies, lib, router);

  return router;
};
