'use strict';

(function() {

  function config($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/events',
        templateUrl: 'app/events/events.html',
        controller: 'EventsController',
        controllerAs: 'vm',
        authenticate: 'user',
        resolve: {
          events: EventsResource => {
            return EventsResource.getList();
          }
        }
      });
  }

  angular
    .module('kedb.events')
    .config(config);

})();
