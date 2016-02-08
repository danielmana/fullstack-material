'use strict';

(function() {

  angular
    .module('kedb.events', [
      'ui.router',
      'restangular',
      'kedb.resources',
      'kedb.services',
      'kedb.infinite-items'
    ]);

})();
