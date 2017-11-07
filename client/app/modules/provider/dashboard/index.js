import angular from 'angular'
import controller from './dashboard.controller'
import template from './dashboard.html'

import PlaceList from './place-list';
import PlaceDetails from './place-details'
import PlaceEdit from './place-edit'

import EventList from './event-list'
import EventDetails from './event-details'
import EventEdit from './event-edit'

export default angular
  .module('app.modules.provider.dashboard', [
    PlaceList,
    PlaceDetails,
    PlaceEdit,
    EventList,
    EventDetails,
    EventEdit
  ])
  .component('appProviderDashboard', {
    controller,
    template,
    controllerAs: 'ctrl'
  })
  .name