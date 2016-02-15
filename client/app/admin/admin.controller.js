'use strict';

(function() {

  class AdminController {
    constructor(UserResource) {
      // Use the User $resource to fetch all users
      this.users = UserResource.getList().$object;
    }

    delete(user) {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    }
  }

  angular
    .module('kedb.admin')
    .controller('AdminController', AdminController);

})();
