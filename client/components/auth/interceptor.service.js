'use strict';

(function() {

  function authInterceptor($q, $injector, tokenService) {
    var state;
    return {
      // Add authorization token to headers
      request(config) {
          let token = tokenService.getToken();
          if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = 'Bearer ' + token;
          }
          return config;
        },

        // Intercept 401s and redirect you to login
        responseError(response) {
          if (response.status === 401) {
            (state || (state = $injector.get('$state'))).go('auth.login');
            // remove any stale tokens
            tokenService.removeToken();
          }
          return $q.reject(response);
        }
    };
  }

  angular.module('kedb.component.auth')
    .factory('authInterceptor', authInterceptor);

})();
