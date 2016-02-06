'use strict';

angular.module('kedb.auth', [
  'kedb.constants',
  'kedb.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
