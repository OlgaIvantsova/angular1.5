import angular from 'angular';
import template from './register.html';
import controller from './register.controller';
import RegisterService from './register.service';
import ParseErrorsService from '../../../shared/services/provider/form.errors'
import './register.scss';

export default angular.module('app.modules.provider.register', [])
  .component('appProviderRegister', {
    template,
    controller,
    controllerAs: 'ctrl'
  })
  .service('RegisterService', RegisterService)
  .service('ParseErrorsService', ParseErrorsService)
  .name
