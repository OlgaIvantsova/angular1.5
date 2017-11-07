import angular from 'angular'
import controller from './nav-bar.controller'
import template from './nav-bar.html'

export default angular.module('app.modules.provider.navbar', [])
  .component('appProviderNavBar', {
    controller,
    template,
    controllerAs: 'ctrl',
    bindings: {
      isUserDropdownShow: '='
    },
    bindToController: true
  })
  .name
