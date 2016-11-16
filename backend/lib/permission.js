'use strict';

const Q = require('q');

module.exports = function() {

  return {
    userCanWriteOnArticle
  };

  function userCanWriteOnArticle() {
    return Q.when(true);
  }
};
