'use strict';

(function() {

  function config($urlRouterProvider, $locationProvider, $mdThemingProvider, RestangularProvider, deviceConfigProvider) {
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

    // setup material themes
    var lzPrimaryPalette = $mdThemingProvider.extendPalette('blue', {
      '500': '#32a1ac',
      '600': '#2c8f98'
    });
    var lzAccentPalette = $mdThemingProvider.extendPalette('red', {
      'A200': '#f07600'
    });
    $mdThemingProvider.definePalette('lzPrimaryPalette', lzPrimaryPalette);
    $mdThemingProvider.definePalette('lzAccentPalette', lzAccentPalette);
    $mdThemingProvider.theme('default')
      .primaryPalette('lzPrimaryPalette')
      .accentPalette('lzAccentPalette');
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
