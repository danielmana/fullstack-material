class InfiniteItemsService {

  // implementing material virtual repeat
  // https://material.angularjs.org/latest/#/demo/material.components.virtualRepeat
  constructor() {
    'ngInject';
  }

  /////////////////
  // public

  getInstance(resource) {
    let instance = new InfiniteItemsService();
    instance.resource = resource;
    instance.query = {
      page: 1,
      limit: 50
    };
    return instance;
  }

  fetchItems() {
    // TODO add filters to query
    let query = angular.copy(this.query);
    this.toLoad = query.page * query.limit;
    this.resolving = true;

    this.resource.getList(query)
      .then(response => {
        this.total = response.total;
        if (parseInt(response.page) === 1) {
          this.items = [];
        }
        Array.prototype.unshift.apply(response, this.items);
        this.items = response;
      })
      .finally(() => {
        this.resolving = false;
      });
  }

  /////////////////
  // required by virtualRepeat

  getItemAtIndex(index) {
    if (index >= this.toLoad) {
      this.query.page++;
      this.fetchItems();
      return null;
    }
    return this.items ? this.items[index] : null;
  }

  getLength() {
    return angular.isDefined(this.total) ? this.total : 10;
  }
}

angular.module('kedb.infinite-items')
  .service('infiniteItemsService', InfiniteItemsService);
