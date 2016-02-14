'use strict';

(function() {

  class DeviceConfigProvider {

    constructor() {
      this.usingDevice = false;
    }

    setUsingDevice(value) {
      this.usingDevice = value;
    }

    $get() {
      return {
        usingDevice: this.usingDevice
      };
    }
  }

  angular
    .module('kedb')
    .provider('deviceConfig', DeviceConfigProvider);

})();
