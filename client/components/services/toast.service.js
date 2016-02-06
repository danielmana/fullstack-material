class ToastService {

  constructor($mdToast) {
    'ngInject';

    this.$mdToast = $mdToast;
  }

  showError(rejection) {
    this.$mdToast.show(this.$mdToast
      .simple()
      .content(rejection)
      .hideDelay(3000)
    );
  }

  showSuccess(message) {
    this.$mdToast.show(this.$mdToast
      .simple()
      .content(message || 'Changes saved successfully')
      .hideDelay(3000)
    );
  }
}

angular.module('kedb.services')
  .service('toastService', ToastService);
