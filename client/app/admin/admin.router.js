'use strict';

(function() {

  function config($stateProvider) {
    $stateProvider
      .state('app.admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController',
        controllerAs: 'admin',
        authenticate: 'admin'
      });
  }

  angular
    .module('kedb.admin')
    .config(config);

})();
