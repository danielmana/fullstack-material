'use strict';

function runBlock(Restangular, toastService) {
  'ngInject';

  Restangular.setErrorInterceptor((rejection) => {
    toastService.showError(rejection.data.message);
    return true;
  });
}

angular.module('kedb.resources')
  .run(runBlock);
