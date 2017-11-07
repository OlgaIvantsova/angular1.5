import angular from 'angular';
import LandingModule from './landing/landing.module';
import ProviderModule from './provider/provider.module';
import RiderModule from './rider/rider.module';

export default angular.module('app.modules', [
  LandingModule,
  ProviderModule,
  RiderModule
]).name;
