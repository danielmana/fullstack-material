(function() {
  'use strict';

  angular.module('events')
    .controller('EventEditCtrl', EventEditCtrl);

  function EventEditCtrl($state, event) {
    var vm = this;
    vm.event = event;
    vm.submit = submit;

    function submit() {
      if (vm.event._id) {
        vm.event.$update(onSuccess);
      } else {
        vm.event.$save(onSuccess);
      }

      function onSuccess(event) {
        $state.go('events.view', {
          id: event._id
        });
      }
    }
  }
})();
