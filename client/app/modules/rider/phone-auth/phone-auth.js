import angular from 'angular';

import template from './phone-auth.html';
import controller from './phone-auth.controller';

export default angular.module('app.modules.rider.phone-auth', [])
  .component('appPhoneAuth', {
    template,
    controller,
    controllerAs: 'ctrl'
  })
  .name
