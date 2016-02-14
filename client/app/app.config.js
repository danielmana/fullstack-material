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
