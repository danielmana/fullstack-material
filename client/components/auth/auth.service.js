'use strict';

(function() {

  function AuthService($location, $q, AuthLocalResource, UserResource, tokenService, appConfig) {
    let currentUser = {};

    return {
      login: login,
      logout: logout,
      createUser: createUser,
      getCurrentUser: getCurrentUser,
      isLoggedIn: isLoggedIn,
      hasRole: hasRole,
      isAdmin: isAdmin,
    };

    function login(data) {
      return AuthLocalResource.post(data)
        .then(res => {
          tokenService.saveToken(res.token);
          return getCurrentUser();
        });
    }

    function logout() {
      tokenService.removeToken();
      currentUser = {};
    }

    function createUser(data) {
      return UserResource.post(data)
        .then(response => {
          tokenService.saveToken(response.token);
          return getCurrentUser();
        });
    }

    // TODO change password
    // function changePassword(oldPassword, newPassword, callback) {
    //   return User.changePassword({
    //     id: currentUser._id
    //   }, {
    //     oldPassword: oldPassword,
    //     newPassword: newPassword
    //   }, function() {
    //     return safeCb(callback)(null);
    //   }, function(err) {
    //     return safeCb(callback)(err);
    //   }).$promise;
    // }

    function getCurrentUser() {
      if (!_.isEmpty(currentUser) || !tokenService.getToken()) {
        var deferred = $q.defer();
        deferred.resolve(currentUser);
        return deferred.promise;
      } else {
        return UserResource.one('me').get()
          .then(response => {
            currentUser = response;
            return currentUser;
          })
          .catch(rejection => {
            logout();
            return $q.reject(rejection);
          });
      }
    }

    function isLoggedIn(loadUser) {
      if (!loadUser) {
        return !!currentUser.role;
      }
      return getCurrentUser()
        .then(res => {
          return !!res.role;
        })
        .catch(() => {
          return false;
        });
    }

    function hasRole(role, loadUser) {
      if (!loadUser) {
        return _hasRole(currentUser, role);
      }
      return getCurrentUser()
        .then(user => {
          return _hasRole(user, role);
        })
        .catch(() => {
          return false;
        });
    }

    function _hasRole(user, role) {
      let userRole = _.get(user, 'role');
      return userRole ?
        (appConfig.userRoles.indexOf(userRole) >= appConfig.userRoles.indexOf(role)) :
        false;
    }

    function isAdmin() {
      return hasRole('admin');
    }
  }

  angular.module('kedb.component.auth')
    .factory('Auth', AuthService);

})();
