(function() {
  'use strict';

  angular
    .module('events')
    .run(runBlock);

  function runBlock(Menus) {

    // Add the events dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Events',
      state: 'events',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'events', {
      title: 'List Events',
      state: 'events.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'events', {
      title: 'Create Events',
      state: 'events.create',
      roles: ['user']
    });
  }
})();
