'use strict';

(function() {

  class EventsController {

    constructor($scope, $state, EventsResource, events) {
      this.$scope = $scope;
      this.$state = $state;
      this.EventsResource = EventsResource;
      this.events = events;

      this.activate();
    }

    activate() {
      this.$scope.$on('kedb:refresh', (event, model) => {
        if (model === 'events') {
          this.refresh();
        }
      });
    }

    refresh() {
      this.events = this.EventsResource.getList().$object;
    }

    showEvent($event, event) {
      this.$state.go('.event.view', {
        id: event._id,
        targetEvent: $event
      });
    }
  }

  angular
    .module('kedb.events')
    .controller('EventsController', EventsController);

})();
