'use strict';

(function() {

  angular
    .module('kedb.events')
    .factory('EventsResource', EventsResource);

  function EventsResource($rootScope, Restangular, toastService) {
    return Restangular
      .withConfig(RestangularConfigurer => {
        RestangularConfigurer.setRestangularFields({
          id: '_id'
        });

        RestangularConfigurer.addResponseInterceptor((data, operation, what, url, response) => {
          if (operation === 'remove') {
            toastService.showRemoveSuccess(what, response.config.data);
          }
          return data;
        });
      })
      .service('api/events');
  }

})();
