'use strict';

(function() {

  class EventViewController {

    constructor($mdDialog, Auth, event) {
      this.$mdDialog = $mdDialog;
      this.isAdmin = Auth.isAdmin();
      this.event = event;
    }

    deleteEvent(event) {
      this.deleting = true;
      event.remove()
        .then(() => {
          this.$mdDialog.hide();
        })
        .finally(() => {
          this.deleting = false;
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
