'use strict';

class NavbarController {

  constructor($mdSidenav, Auth) {
    this.$mdSidenav = $mdSidenav;

    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  toggleSidenav() {
    this.$mdSidenav('sidenav').toggle();
  }
}

angular.module('kedb')
  .controller('NavbarController', NavbarController);
