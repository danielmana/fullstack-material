'use strict';

angular
  .module('kedbApp', [
    'kedbApp.auth',
    'kedbApp.admin',
    'kedbApp.constants',
    'kedb.resources',
    'kedb.services',

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
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
