(function() {
  'use strict';

  angular
    .module('events')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('events', {
        abstract: true,
        url: '/events',
        template: '<ui-view/>'
      })
      // list
      .state('events.list', {
        url: '',
        templateUrl: 'modules/events/client/events-list/events-list.html',
        controller: 'EventsListCtrl',
        controllerAs: 'vm',
        resolve: {
          events: function(Events) {
            return Events.query();
          }
        }
      })
      // view
      .state('events.view', {
        url: '/:id',
        templateUrl: 'modules/events/client/event-view/event-view.html',
        controller: 'EventViewCtrl',
        controllerAs: 'vm',
        resolve: {
          event: function($stateParams, Events) {
            return Events.get({
              id: $stateParams.id
            });
          }
        },
      })
      // edit
      .state('events.edit', {
        url: '/:id/edit',
        templateUrl: 'modules/events/client/event-edit/event-edit.html',
        controller: 'EventEditCtrl',
        controllerAs: 'vm',
        resolve: {
          event: function($stateParams, Events) {
            return Events.get({
              id: $stateParams.id
            });
          }
        },
        data: {
          roles: ['user', 'admin']
        }
      })
      // create
      .state('events.create', {
        url: '/create',
        templateUrl: 'modules/events/client/event-edit/event-edit.html',
        controller: 'EventEditCtrl',
        controllerAs: 'vm',
        resolve: {
          event: function(Events) {
            return new Events({
              title: '',
              content: ''
            });
          }
        },
        data: {
          roles: ['user', 'admin']
        }
      });
  }
})();
