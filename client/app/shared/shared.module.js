import angular from 'angular';
import Map from './map/map';
import Services from './services';

export default angular.module('app.shared', [
  Services,
  Map
])
.name;

