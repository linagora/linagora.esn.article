'use strict';

const uuidV4 = require('uuid/v4');

module.exports = function(dependencies) {

  const collaboration = dependencies('collaboration');
  const mongoose = dependencies('db').mongo.mongoose;
  const ObjectId = mongoose.Schema.ObjectId;
  const ArticleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    creator: {type: ObjectId, ref: 'User'},
    timestamps: {
      creation: {type: Date, default: Date.now}
    },
    // collaboration type
    type: {type: String, default: 'open'},
    status: {type: String, default: 'open'},
    activity_stream: {
      uuid: {type: String, default: uuidV4},
      timestamps: {
        creation: {type: Date, default: Date.now}
      }
    },
    schemaVersion: {type: Number, default: 1}
  });

  return collaboration.registerCollaborationModel('esn.article', 'Article', ArticleSchema);
};
