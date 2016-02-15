'use strict';

(function() {

  function config($urlRouterProvider, $locationProvider, RestangularProvider, deviceConfigProvider) {
    $urlRouterProvider.otherwise('/events');

    let usingDevice = /true/i.test('@@usingDevice');
    deviceConfigProvider.setUsingDevice(usingDevice);

    if (usingDevice) {
      // config for app
      RestangularProvider.setBaseUrl('@@apiBaseUrl');
    } else {
      // config for website
      $locationProvider.html5Mode(true);
    }
  }

  function runBlock($rootScope, Restangular, toastService) {

    // show toast on API error
    Restangular.setErrorInterceptor(rejection => {
      toastService.showError(rejection);
      return true;
    });

    $rootScope.$on('$stateChangeStart', () => {
      $rootScope.stateResolving = true;
    });

    $rootScope.$on('$stateChangeSuccess', () => {
      $rootScope.stateResolving = false;
    });
  }

  angular
    .module('kedb')
    .config(config)
    .run(runBlock);

})();
