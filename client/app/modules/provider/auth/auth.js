import angular from 'angular';
import template from './auth.html';
import controller from './auth.controller';

export default angular.module('app.modules.provider.auth', [])
  .component('appProviderAuth', {
    template,
    controller,
    controllerAs: 'ctrl'
  })
  .name
