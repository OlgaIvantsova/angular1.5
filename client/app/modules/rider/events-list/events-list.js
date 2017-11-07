import angular from 'angular';

import template from './events-list.html';
import controller from './events-list.controller';

export default angular.module('app.modules.events-list', [])
  .component('appEventsList', {
    template,
    controller,
    controllerAs: 'ctrl',
    bindings: {
      place: '=',
      events: '='
    },
    bindToController: true
  })
  .name
