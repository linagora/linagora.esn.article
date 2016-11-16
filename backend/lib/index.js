'use strict';

module.exports = function(dependencies) {

  const models = {
    article: require('./db/article')(dependencies)
  };
  const article = require('./article')(dependencies);
  const permission = require('./permission')();

  return {
    article,
    models,
    permission,
    start
  };

  function start(callback) {
    callback();
  }
};
