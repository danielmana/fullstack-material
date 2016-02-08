class ToastService {

  constructor($rootScope, $mdToast, Restangular) {
    'ngInject';

    this.$rootScope = $rootScope;
    this.$mdToast = $mdToast;
    this.Restangular = Restangular;
  }

  showError(rejection) {
    this.$mdToast.show(this.$mdToast
      .simple()
      .content(rejection)
      .hideDelay(3000)
    );
  }

  showRemoveSuccess(what, data) {
    return this.$mdToast.show(this.$mdToast
      .simple()
      .action('UNDO')
      .content(`Delete success!`)
      .hideDelay(10000)
    ).then(undo => {
      if (undo === 'ok') {
        // restore data if `undo`
        this.Restangular.all(what).post(data)
          .then(() => {
            // broadcast event to refresh list
            this.$rootScope.$broadcast('kedb:refresh', what.replace('api/', ''));
          });
      }
    });
  }
}

angular.module('kedb.services')
  .service('toastService', ToastService);
