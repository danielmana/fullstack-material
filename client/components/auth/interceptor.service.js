'use strict';

(function() {

function authInterceptor($rootScope, $q, $cookies, $injector, Util, tokenService, deviceConfig) {
  var state;
  return {
    // Add authorization token to headers
    request(config) {
      let token = tokenService.getToken();
      if (!token) {
        return config;
      }
      if (deviceConfig.usingDevice && !/\.html/.test(config.url)) {
        // token for app
        config.params = config.params || {};
        _.extend(config.params, {
          'access_token': token
        });
      } else {
        // token for website
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError(response) {
      if (response.status === 401) {
        (state || (state = $injector.get('$state'))).go('login');
        // remove any stale tokens
        $cookies.remove('token');
      }
      return $q.reject(response);
    }
  };
}

angular.module('kedb.auth')
  .factory('authInterceptor', authInterceptor);

})();
