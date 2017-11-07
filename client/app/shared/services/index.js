import angular from 'angular';
import ApiService from './api.service';
import smoke from './smoke/smoke'
import confirm from './confirm/confirm.service'

export default angular.module('app.shared.services', [])
  .service('api', ApiService)
  .service('smoke', function() {
    return smoke
  })
  .service('confirm', confirm)
  .name;
