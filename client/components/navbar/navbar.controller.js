'use strict';

class NavbarController {

  constructor($mdSidenav) {
    this.$mdSidenav = $mdSidenav;
  }

  toggleSidenav() {
    this.$mdSidenav('sidenav').toggle();
  }
}

angular.module('kedb')
  .controller('NavbarController', NavbarController);
