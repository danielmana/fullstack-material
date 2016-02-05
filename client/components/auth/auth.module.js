'use strict';

angular.module('kedbApp.auth', [
  'kedbApp.constants',
  'kedbApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
