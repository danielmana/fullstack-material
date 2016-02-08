'use strict';

(function() {

  function config($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/events');
    $locationProvider.html5Mode(true);
  }

  function runBlock(Restangular, toastService) {

    // show toast on API error
    Restangular.setErrorInterceptor((rejection) => {
      toastService.showError(rejection);
      return true;
    });
  }

  angular
    .module('kedb')
    .config(config)
    .run(runBlock);

})();
