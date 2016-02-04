(function() {
  'use strict';

  angular.module('events')
    .controller('EventViewCtrl', EventViewCtrl);

  function EventViewCtrl($state, Authentication, event) {
    var vm = this;
    vm.currentUser = Authentication.user;
    vm.event = event;
    vm.remove = remove;

    function remove() {
      vm.event.$remove(function() {
        $state.go('events.list');
      });
    }
  }
})();
