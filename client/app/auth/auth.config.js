'use strict';

(function() {

  function runBlock($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if (next.name === 'auth.logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  }

  angular.module('kedb.auth')
    .run(runBlock);

})();
