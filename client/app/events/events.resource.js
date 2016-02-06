'use strict';

(function() {

  function EventsResource(Restangular) {
    return Restangular
      .service('api/events');
  }

  angular
    .module('kedb.events')
    .factory('EventsResource', EventsResource);

})();
