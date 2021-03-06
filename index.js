'use strict';

const AwesomeModule = require('awesome-module');
const Dependency = AwesomeModule.AwesomeModuleDependency;
const path = require('path');
const glob = require('glob-all');
const _ = require('lodash');

const NAME = 'article';
const APP_ENTRY_POINT = NAME + '.app.js';
const MODULE_NAME = 'linagora.esn.' + NAME;
const FRONTEND_JS_PATH = __dirname + '/frontend/app/';

const articleModule = new AwesomeModule(MODULE_NAME, {
  dependencies: [
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.logger', 'logger'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.auth', 'auth'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.pubsub', 'pubsub'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.wrapper', 'webserver-wrapper'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.esn-config', 'esn-config'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.middleware.authorization', 'authorizationMW'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.middleware.activitystream', 'activitystreamMW'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.middleware.resource-link', 'resourceLinkMW'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.user', 'user'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.collaboration', 'collaboration'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.wsserver', 'wsserver'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.helpers', 'helpers'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.db', 'db'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.like', 'like'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.vote', 'vote')
  ],
  states: {
    lib: function(dependencies, callback) {
      const collaborationModule = dependencies('collaboration');
      const libModule = require('./backend/lib')(dependencies);
      const article = require('./backend/webserver/api')(dependencies, libModule);
      const lib = {
        api: {
          article
        },
        lib: libModule
      };

      collaborationModule.registerCollaborationLib('esn.article', libModule.article.collaborationHook());
      callback(null, lib);
    },

    deploy: function(dependencies, callback) {
      const webserverWrapper = dependencies('webserver-wrapper');
      const app = require('./backend/webserver/application')(this, dependencies);
      const lessFile = path.resolve(__dirname, './frontend/app/article.styles.less');

      let frontendModules = glob.sync([
        FRONTEND_JS_PATH + '**/!(*spec).js'
      ]).map(filepath => filepath.replace(FRONTEND_JS_PATH, ''));

      _.pull(frontendModules, APP_ENTRY_POINT);
      frontendModules = [APP_ENTRY_POINT].concat(frontendModules);

      app.use('/api', this.api.article);
      webserverWrapper.injectAngularAppModules(NAME, frontendModules, MODULE_NAME, ['esn']);
      webserverWrapper.injectLess(NAME, [lessFile], 'esn');
      webserverWrapper.addApp(NAME, app);

      callback();
    },

    start: function(dependencies, callback) {
      this.lib.start(callback);
    }
  }
});

module.exports = articleModule;
