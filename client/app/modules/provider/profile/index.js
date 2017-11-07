import angular from 'angular'
import template from './profile.html'
import controller from './profile.controller'
import ProfileService from './profile.service'
import ParseErrorsService from '../../../shared/services/provider/form.errors'

export default angular.module('app.modules.provider.profile', [])
  .component('appProviderProfile', {
    controller,
    template,
    controllerAs: 'ctrl'
  })
  .service('ProfileService', ProfileService)
  .service('ParseErrorsService', ParseErrorsService)
  .name