'use strict';

(function() {

  function TokenService($cookies) {
    var service = {
      getToken: getToken,
      saveToken: saveToken,
      removeToken: removeToken
    };

    return service;

    function getToken() {
      return window.localStorage.getItem('token') || $cookies.get('token');
    }

    function saveToken(token) {
      $cookies.put('token', token);
      window.localStorage.setItem('token', token);
    }

    function removeToken() {
      $cookies.remove('token');
      window.localStorage.removeItem('token');
    }
  }

  angular.module('kedb.auth')
    .factory('tokenService', TokenService);

})();
