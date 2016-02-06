'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Events',
    'state': 'main'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor($mdSidenav, Auth) {
    this.$mdSidenav = $mdSidenav;

    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }

  toggleSidenav() {
    this.$mdSidenav('sidenav').toggle();
  }
}

angular.module('kedbApp')
  .controller('NavbarController', NavbarController);
