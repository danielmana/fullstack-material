(function() {
	'use strict';

	angular
		.module('events')
		.controller('EventsListCtrl', EventsListCtrl);

	function EventsListCtrl(events) {
		var vm = this;
		vm.events = events;
	}
})();
