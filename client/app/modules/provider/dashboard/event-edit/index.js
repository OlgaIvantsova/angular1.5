import angular from 'angular'
import template from './event-edit.html'
import controller from './event-edit.controller'

export default angular.module('app.modules.provider.event-edit', [])
  .component('appProviderEventEdit', {
    template,
    controller,
    bindings: {
      activeEvent: '=',
      parentActions: '=',
      successUpdateEvent: '&',
      showEventDetails: '&',
      isMobileVersion: '&',
      backToPlaceList: '&'
    },
    controllerAs: 'ctrl'
  })
  .name