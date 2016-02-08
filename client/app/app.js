'use strict';

(function() {

  angular
    .module('kedb', [
      'kedb.auth',
      'kedb.admin',
      'kedb.constants',
      'kedb.toast',
      'kedb.events',

      'ngMaterial',
      'ngCookies',
      'ngResource',
      'restangular',
      'ngSanitize',
      'ui.router',
      'ui.bootstrap',
      'validation.match'
    ]);

})();
