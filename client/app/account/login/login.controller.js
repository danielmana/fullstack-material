'use strict';

class LoginController {

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;

    this.user = {};
  }

  submit(form) {
    this.Auth.login(this.user)
      .then(() => {
        // Logged in, redirect to home
        this.$state.go('main');
      })
      .catch(() => {
        // TODO
      });
  }
}

angular.module('kedbApp')
  .controller('LoginController', LoginController);
