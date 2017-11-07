import angular from 'angular';
import template from './login.html';
import controller from './login.controller';
import LoginService from './login.service';
import ParseErrorsService from '../../../shared/services/provider/form.errors'
import './login.scss';

export default angular.module('app.modules.provider.login', [])
  .component('appProviderLogin', {
    template,
    controller,
    controllerAs: 'ctrl'
  })
  .service('LoginService', LoginService)
  .service('ParseErrorsService', ParseErrorsService)
  .name
