import angular from 'angular';

import template from './code-confirm.html';
import controller from './code-confirm.controller';

export default angular.module('app.modules.rider.codeConfirm', [])
  .component('appCodeConfirm', {
    template,
    controller,
    controllerAs: 'ctrl'
  })
  .name
