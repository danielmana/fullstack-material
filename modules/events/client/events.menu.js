(function() {
  'use strict';

  angular
    .module('events')
    .run(runBlock);

  function runBlock(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Events',
      state: 'events.list',
      roles: ['*']
    });
  }
})();
