import angular from 'angular'
import template from './event-details.html'
import controller from './event-details.controller'

export default angular.module('app.modules.provider.event-details', [])
  .component('appProviderEventDetails', {
    template,
    controller,
    bindings: {
      activeEvent: '=',
      openConfirmRemoveEvent: '&',
      showEventEdit: '&',
      isMobileVersion: '&',
      backToPlaceList: '&'
    },
    controllerAs: 'ctrl'
  })
  .name