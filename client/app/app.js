'use strict';

angular
  .module('kedb', [
    'kedb.auth',
    'kedb.admin',
    'kedb.constants',
    'kedb.resources',
    'kedb.services',
    'kedb.events',

    'ngMaterial',
    'ngCookies',
    'ngResource',
    'restangular',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/events');

    $locationProvider.html5Mode(true);
  });
