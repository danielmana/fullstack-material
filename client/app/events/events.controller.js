'use strict';

(function() {

  class EventsController {

    constructor($scope, $state, EventsResource, infiniteItemsService) {
      this.$scope = $scope;
      this.$state = $state;
      this.infiniteItemsService = infiniteItemsService;
      this.EventsResource = EventsResource;

      this.activate();
    }

    activate() {
      this.data = this.infiniteItemsService.getInstance(this.EventsResource);

      // refresh events
      this.$scope.$on('kedb:refresh', (event, model) => {
        if (model === 'events') {
          this.refresh();
        }
      });
    }

    refresh() {
      this.data.setPage(1);
      this.data.fetchItems();
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
