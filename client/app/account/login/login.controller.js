'use strict';

class LoginController {

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;

    this.user = {};
  }

  submit() {
    this.Auth.login(this.user)
      .then(() => {
        // Logged in, redirect to events
        this.$state.go('events');
      })
      .catch(() => {
        // TODO
      });
  }
}

angular.module('kedb')
  .controller('LoginController', LoginController);
