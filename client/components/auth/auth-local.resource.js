'use strict';

(function() {

  function AuthLocalResource(Restangular) {
    return Restangular
      .service('auth/local');
  }

  angular.module('kedb.component.auth')
    .factory('AuthLocalResource', AuthLocalResource);

})();
