import angular from 'angular';
import AuthService from './auth.service';
import EventsService from './events.service';
import UberAuthService from './uber-auth.service';

export default angular.module('app.modules.rider.services', [])
  .service('authService', AuthService)
  .service('eventsService', EventsService)
  .service('uberAuthService', UberAuthService)
  .name;
