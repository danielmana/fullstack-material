'use strict';

(function() {

  class EventViewController {

    constructor($mdDialog, event) {
      this.$mdDialog = $mdDialog;
      this.event = event;
    }

    deleteEvent(event) {
      event.remove()
        .then(() => {
          this.$mdDialog.hide();
        });
    }

    cancel() {
      this.$mdDialog.cancel();
    }
  }

  angular
    .module('kedb.events')
    .controller('EventViewController', EventViewController);

})();
