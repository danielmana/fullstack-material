'use strict';

(function() {

  angular.module('kedb.component.auth')
    .run(function($rootScope, $state, Auth) {
      // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
      $rootScope.$on('$stateChangeStart', function(event, next) {
        if (!next.authenticate) {
          return;
        }
        if (typeof next.authenticate === 'string') {
          if (Auth.hasRole(next.authenticate)) {
            return;
          } else {
            event.preventDefault();
            return Auth.isLoggedIn(true)
              .then(is => {
                $state.go(is ? 'app.events' : 'auth.login');
              });
          }
        } else {
          if (Auth.isLoggedIn()) {
            return;
          } else {
            event.preventDefault();
            $state.go('auth.login');
          }
        }
      });
    });

})();
