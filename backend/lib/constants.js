'use strict';

module.exports = {
  DEFAULT_LIMIT: 25,
  DEFAULT_OFFSET: 0,
  NOTIFICATIONS: {
    CREATED: 'esn:article:created'
  },
  OBJECT_TYPE: 'esn.article',
  SKIP_FIELDS: {
    USER: '-password -accounts'
  },
  STATUS: {
    open: 'open',
    closed: 'closed'
  }
};
