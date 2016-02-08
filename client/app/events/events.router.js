'use strict';

(function() {

  function config($stateProvider) {
    $stateProvider
      .state('events', {
        url: '/events',
        templateUrl: 'app/events/events.html',
        controller: 'EventsController',
        controllerAs: 'vm',
        authenticate: 'user'
      })
      .state('events.event', {
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
      .state('events.event.view', {
        url: '/view',
        onEnter: ($state, $stateParams, $mdDialog, $mdMedia) => {
          $mdDialog.show({
              // targetEvent: $stateParams.targetEvent,
              templateUrl: 'app/events/event-view/event-view.html',
              controller: 'EventViewController',
              controllerAs: 'vm',
              fullscreen: $mdMedia('sm') || $mdMedia('xs'),
              resolve: {
                event: (EventsResource) => {
                  return EventsResource.one($stateParams.id).get();
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
