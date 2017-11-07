import angular from 'angular';

import template from './map.html';
import controller from './map.controller';
import MapService from './map.service';

export default angular.module('app.shared.map', [])
  // .run( (  ) => {
  //   (function(){
  //     if (document.getElementById('google-maps-api')) {return;}
  //     var mapsApi = document.getElementsByTagName('script')[0];
  //
  //     var js = document.createElement('script');
  //     js.id = 'google-maps-api';
  //     js.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCYicqSOHVUM6XS8mkUmYvv5XMssDo7y4A&libraries=places";
  //     mapsApi.parentNode.insertBefore(js, mapsApi);
  //   }());
  // })
  .service('mapService', MapService)
  .component('appMap', {
    template,
    controller,
    controllerAs: 'ctrl',
    bindings: {
      markers: '='
    },
    bindToController: true
  })
  .name
