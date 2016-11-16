'use strict';

module.exports = function() {

  return {
    getArticles
  };

  function getArticles(req, res) {
    res.status(200).json([]);
  }

};
