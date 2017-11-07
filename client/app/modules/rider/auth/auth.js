import angular from 'angular';
import 'ng-facebook';

import template from './auth.html';
import controller from './auth.controller';

export default angular.module('app.modules.rider.auth', ['ngFacebook'])
  .component('appRiderAuth', {
    template,
    controller,
    controllerAs: 'ctrl'
  })
  .name
