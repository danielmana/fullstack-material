'use strict';

(function() {

  class EventViewController {

    constructor($mdDialog, Auth, event) {
      this.$mdDialog = $mdDialog;
      this.isAdmin = Auth.isAdmin();
      this.event = event;

      this.types = ['Software', 'Hardware'];
      this.severities = [1, 2, 3, 4, 5, 6, 7];
      this.criticalities = ['Low', 'Medium', 'High'];
      this.vendors = [
        'Cisco',
        'Microsoft',
        'Sendmail',
        'Apache',
        'Redhat',
        'Ubuntu',
        'Postgres',
        'MySQL',
        'LogZilla',
        'Other (TODO)'
      ];
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

    close() {
      this.$mdDialog.cancel();
    }
  }

  angular
    .module('kedb.events')
    .controller('EventViewController', EventViewController);

})();
