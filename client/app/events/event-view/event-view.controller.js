'use strict';

(function() {

  class EventViewController {

    constructor($mdDialog, Auth, event) {
      this.$mdDialog = $mdDialog;
      this.isAdmin = Auth.isAdmin();
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
