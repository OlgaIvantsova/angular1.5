import angular from 'angular'
import controller from './place-edit.controller'
import template from './place-edit.html'
import PlaceEditService from './place-edit.service'

export default angular.module('app.modules.provider.place-edit', [])
  .component('appProviderPlaceEdit', {
    controller,
    template,
    bindings: {
      currentPlace: '=',
      categories: '=',
      successUpdatePlace: '&',
      parentActions: '=',
      isMobileVersion: '&',
      backToPlaceList: '&'
    },
    controllerAs: 'ctrl'
  })
  .service('PlaceEditService', PlaceEditService)
  .name