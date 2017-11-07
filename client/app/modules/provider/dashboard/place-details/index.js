import angular from 'angular'
import controller from './place-details.controller'
import template from './place-details.html'

export default angular.module('app.modules.provider.place-details', [])
  .component('appProviderPlaceDetails', {
    controller,
    template,
    bindings: {
      currentPlace: '=',
      showPlaceEdit: '&',
      placeMarkers: '=',
      isMobileVersion: '&',
      backToPlaceList: '&'
    },
    controllerAs: 'ctrl'
  })
  .name