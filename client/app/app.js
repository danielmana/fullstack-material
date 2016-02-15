'use strict';

(function() {

  angular
    .module('kedb', [
      'kedb.auth',
      'kedb.admin',
      'kedb.events',

      'kedb.component.auth',
      'kedb.constants',
      'kedb.toast',

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
