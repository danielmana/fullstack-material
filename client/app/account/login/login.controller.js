'use strict';

(function() {

  class LoginController {

    constructor(Auth, $state) {
      this.Auth = Auth;
      this.$state = $state;

      this.form = {};
      this.user = {};
    }

    submit() {
      this.Auth.login(this.user)
        .then(() => {
          this.$state.go('events');
        })
        .catch(() => {
          // TODO
        })
        .finally(() => {
          this.form.$setPristine();
        });
    }
  }

  angular.module('kedb')
    .controller('LoginController', LoginController);

})();
