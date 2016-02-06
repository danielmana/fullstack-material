'use strict';

(function() {

  class EventsController {

    constructor($state, events) {
      this.$state = $state;
      this.events = events;
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
