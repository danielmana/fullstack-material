'use strict';

(function() {

  class SignupController {

    constructor(Auth, $state) {
      this.Auth = Auth;
      this.$state = $state;

      this.form = {};
      this.user = {};
    }

    submit() {
      let data = _.pick(this.user, ['name', 'email', 'password']);
      this.Auth.createUser(data)
        .then(() => {
          this.$state.go('app.events');
        })
        .catch(err => {

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.data.errors, (error, field) => {
            this.form[field].$setValidity('mongoose', false);
            this.form[field].$error.mongoose = error.message;
          });
        });
    }
  }

  angular.module('kedb.auth')
    .controller('SignupController', SignupController);

})();
