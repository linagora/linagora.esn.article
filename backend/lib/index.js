'use strict';

module.exports = function(dependencies) {

  const models = {
    article: require('./db/article')(dependencies)
  };
  const article = require('./article')(dependencies);

  return {
    article,
    models,
    start
  };

  function start(callback) {
    callback();
  }
};
