import angular from 'angular';
import template from './landing.html';
import controller from './landing.controller';

export default angular.module('app.modules.landing', [

]).config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('landing', {
    abstract: true,
    template,
    controller,
    controllerAs: 'ctrl'
  }).state('auth', {
    url: '/',
    parent: 'landing',
    views: {
      riders: {
        template: '<app-rider-auth></app-rider-auth>'
      },
      providers: {
        template: '<app-provider-auth></app-provider-auth>'
      }
    }
  })
}).name;
