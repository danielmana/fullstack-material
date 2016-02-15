'use strict';

(function() {

  class AppController {

    constructor(currentUser) {
      this.currentUser = currentUser;
    }
  }

  angular
    .module('kedb')
    .controller('AppController', AppController);

})();
