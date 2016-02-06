'use strict';

(function() {

  function EventsResource(Restangular) {
    return Restangular
      .withConfig(config)
      .service('api/events');
  }

  function config(RestangularConfigurer) {
    RestangularConfigurer.setRestangularFields({
      id: '_id'
    });
  }

  angular
    .module('kedb.events')
    .factory('EventsResource', EventsResource);

})();
