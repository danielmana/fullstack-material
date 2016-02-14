'use strict';

(function() {

  function UserResource(Restangular) {
    return Restangular
      .service('api/users');
  }

  angular.module('kedb.auth')
    .factory('UserResource', UserResource);

})();
