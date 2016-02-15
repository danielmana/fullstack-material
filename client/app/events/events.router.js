'use strict';

(function() {

  function config($stateProvider) {
    $stateProvider
      .state('app.events', {
        url: '/events',
        templateUrl: 'app/events/events.html',
        controller: 'EventsController',
        controllerAs: 'vm',
        authenticate: 'user'
      })
      .state('app.events.event', {
        abstract: true,
        url: '/:id',
        // TODO find workaround for passing `$event` as a param:
        // `Can't copy! Making copies of Window or Scope instances is not supported.`
        // params: {
        //   targetEvent: null
        // },
        resolve: {
          event: ($stateParams, EventsResource) => {
            return EventsResource.one($stateParams.id).get;
          }
        }
      })
      .state('app.events.event.view', {
        url: '/view',
        resolve: {
          eventResolve: ($stateParams, EventsResource) => {
            return EventsResource.one($stateParams.id).get();
          }
        },
        onEnter: ($state, $mdDialog, $mdMedia, eventResolve) => {
          $mdDialog.show({
              // targetEvent: $stateParams.targetEvent,
              templateUrl: 'app/events/event-view/event-view.html',
              controller: 'EventViewController',
              controllerAs: 'vm',
              fullscreen: $mdMedia('sm') || $mdMedia('xs'),
              resolve: {
                event: () => {
                  return eventResolve;
                }
              }
            })
            .then(() => {
              $state.go('^.^', null, {
                reload: true
              });
            }, () => {
              $state.go('^.^');
            });
        }
      });
  }

  angular
    .module('kedb.events')
    .config(config);

})();
