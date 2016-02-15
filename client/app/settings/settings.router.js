'use strict';

(function() {

  function config($stateProvider) {
    $stateProvider
      .state('app.settings', {
        url: '/settings',
        templateUrl: 'app/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        authenticate: true
      });
  }

  angular.module('kedb')
    .config(config);

})();
