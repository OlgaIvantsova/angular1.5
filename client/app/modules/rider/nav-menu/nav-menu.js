import angular from 'angular';

import template from './nav-menu.html';
import controller from './nav-menu.controller';

export default angular.module('app.modules.nav-menu', [])
  .component('appRiderNavMenu', {
    template,
    controller,
    controllerAs: 'ctrl',
    bindToController: true
  })
  .name
