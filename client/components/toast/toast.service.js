class ToastService {

  constructor($rootScope, $mdToast, $log, Restangular) {
    this.$rootScope = $rootScope;
    this.$mdToast = $mdToast;
    this.$log = $log;
    this.Restangular = Restangular;
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
          .then(response => {
            // broadcast event to refresh list
            this.$rootScope.$broadcast('kedb:refresh', what.replace('api/', ''));
            // show message item restored
            this.show(`'${response.name}' restored`);
          });
      }
    });
  }

  showError(rejection) {
    this.$log.error(rejection);
    let message = _.get(rejection, 'data.message') || rejection.statusText || 'Error occurred';
    this.show(message);
  }

  show(message) {
    this.$mdToast.show(this.$mdToast
      .simple()
      .content(message)
      .hideDelay(3000)
    );
  }
}

angular.module('kedb.toast')
  .service('toastService', ToastService);
