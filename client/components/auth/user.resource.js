'use strict';

(function() {

  function UserResource(Restangular) {
    return Restangular
      .service('api/users');
  }

  angular.module('kedb.component.auth')
    .factory('UserResource', UserResource);

})();
