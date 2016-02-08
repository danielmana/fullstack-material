'use strict';

(function() {

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

          // return array for paginated results
          let result = angular.copy(data);
          if (data.docs) {
            result = data.docs;
            delete data.docs;
            _.defaults(result, data);
          }
          return result;
        });
      })
      .service('api/events');
  }

  angular
    .module('kedb.events')
    .factory('EventsResource', EventsResource);

})();
