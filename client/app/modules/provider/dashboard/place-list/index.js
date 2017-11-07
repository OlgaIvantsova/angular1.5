import angular from 'angular'
import controller from './place-list.controller'
import template from './place-list.html'
import PlaceService from './place-list.service'

export default angular.module('app.modules.provider.place-list', [])
    .component('appProviderPlaceList', {
      controller,
      template,
      bindings: {
        place: '=',
        events: '=',
        handlerClickPlace: '&',
        openConfirmModal: '&',
        showEventAdd: '&'
      },
      controllerAs: 'ctrl'
    })
    .service('PlaceService', PlaceService)
    .name