'use strict';

(function() {

  class EventsController {

    constructor(events) {
      this.events = events;
    }
  }

  angular
    .module('kedb.events')
    .controller('EventsController', EventsController);

})();
