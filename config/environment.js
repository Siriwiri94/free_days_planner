'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'free-days-planner',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }
  if (environment === 'development') {  
    ENV.host = 'http://192.168.88.40:3000';
  }
  ENV['ember-simple-auth'] = {  
    authorizer: 'authorizer:custom',
    routeAfterAuthentication: '/',
  };
  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: ENV.host+'/authenticate',
    identificationField: 'username',
    passwordField: 'password',
    tokenPropertyName: 'auth_token',
    refreshTokenPropertyName: 'auth_token',
    authorizationPrefix: 'Bearer ',
    authorizationHeaderName: 'Authorization',
    headers: {},
    refreshAccessTokens: true,
    serverTokenRefreshEndpoint: ENV.host+'/authenticate',
    tokenExpireName: 'exp',
    refreshLeeway: 0,
  };
  return ENV;
};
