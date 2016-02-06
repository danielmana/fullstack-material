'use strict';

(function() {

  function AuthLocalResource(Restangular) {
    return Restangular
      .service('auth/local');
  }

  angular.module('kedb.auth')
    .factory('AuthLocalResource', AuthLocalResource);

})();
