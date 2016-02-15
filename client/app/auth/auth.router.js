'use strict';

(function() {

  function config($stateProvider) {
    $stateProvider
      .state('auth', {
        abstract: true,
        templateUrl: 'app/auth/auth.html'
      })
      .state('auth.login', {
        url: '/login',
        templateUrl: 'app/auth/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('auth.logout', {
        url: '/logout?referrer',
        referrer: 'app.events',
        template: '',
        controller: function($state, Auth) {
          var referrer = $state.params.referrer || $state.current.referrer || 'app.events';
          Auth.logout();
          $state.go(referrer);
        }
      })
      .state('auth.signup', {
        url: '/signup',
        templateUrl: 'app/auth/signup/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      });
  }

  angular.module('kedb.auth')
    .config(config);

})();
