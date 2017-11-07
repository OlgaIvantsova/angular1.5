import angular from 'angular';

import template from './uber-callback.html';
import controller from './uber-callback.controller';

export default angular.module('app.modules.rider.uberCallback', [])
  .component('appUberCallback', {
    template,
    controller,
    controllerAs: 'ctrl'
  })
  .name
