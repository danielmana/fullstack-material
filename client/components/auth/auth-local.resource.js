'use strict';

(function() {

  function AuthLocalResource(Restangular) {
    return Restangular
      .service('auth/local');
  }

  angular.module('kedbApp.auth')
    .factory('AuthLocalResource', AuthLocalResource);

})();
