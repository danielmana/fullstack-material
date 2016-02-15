'use strict';

(function() {

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        abstract: true,
        templateUrl: 'app/app.html',
        controller: 'AppController',
        controllerAs: 'app',
        resolve: {
          currentUser: Auth => {
            return Auth.getCurrentUser();
          }
        }
      });

    $urlRouterProvider.otherwise('/events');
  }

  angular
    .module('kedb.admin')
    .config(config);

})();
