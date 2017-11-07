import angular from 'angular';

import template from './search-events.html';
import controller from './search-events.controller';

export default angular.module('app.modules.rider.search-events', [])
  .config( function() {
  })
  .component('appSearchEvents', {
    template,
    controller,
    controllerAs: 'ctrl'
  })
  .name
