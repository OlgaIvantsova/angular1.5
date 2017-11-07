import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Shared from './shared/shared.module';
import Modules from './modules/modules';
import AppComponent from './app.component';

import angularAnimate from 'angular-animate';
import angularAria from 'angular-aria';
// import angularMaterial from 'angular-material';

import 'normalize.css';
// import 'angular-material/angular-material.css';
import 'angular-animate';
import 'angular-toastr';
import 'angular-toastr/dist/angular-toastr.css'
import 'font-awesome/less/font-awesome.less';

import runFunction from './run';

angular.module('app', [
  // angularMaterial,
  angularAria,
  angularAnimate,
  'ngAnimate',
  'toastr',
  uiRouter,
  Shared,
  Modules
])
.config(($locationProvider) => {  // $mdThemingProvider
  "ngInject";
  $locationProvider.html5Mode(true);
  //
  // $mdThemingProvider
  //   .theme('default')
})
.run(runFunction).component('app', AppComponent);
