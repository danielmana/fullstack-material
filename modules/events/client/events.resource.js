(function() {
	'use strict';

	angular
		.module('events')
		.factory('Events', Events);

	function Events($resource) {
		return $resource('api/events/:id', {
			id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
})();
