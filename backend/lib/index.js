'use strict';

module.exports = function(dependencies) {

  const models = {
    article: require('./db/article')(dependencies)
  };

  return {
    models,
    start
  };

  function start(callback) {
    callback();
  }
};
