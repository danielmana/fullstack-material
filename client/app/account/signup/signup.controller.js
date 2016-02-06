'use strict';

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
        // Account created, redirect to home
        this.$state.go('main');
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

angular.module('kedb')
  .controller('SignupController', SignupController);
