'use strict';

(function() {

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'app/app.html'
      });

    $urlRouterProvider.otherwise('/events');
  }

  angular
    .module('kedb.admin')
    .config(config);

})();
