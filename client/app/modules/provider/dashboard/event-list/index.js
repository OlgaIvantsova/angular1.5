import angular from 'angular'
import controller from './event-list.controller'
import template from './event-list.html'
import EventService from './event-list.service'

export default angular.module('app.modules.provider.event-list', [])
  .component('appProviderEventList', {
    controller,
    template,
    bindings: {
      event: '='
    },
    controllerAs: 'ctrl'
  })
  .service('EventService', EventService)
  .name