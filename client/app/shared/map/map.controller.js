export default class MapController {

  constructor($q, $element, $scope) {
    'ngInject';

    Object.assign(this, {$q, $element, $scope});
  }

  $onInit() {
    if (!this.map) {
      let location =  {lat: 39.0119, lng: -98.1917};

      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        })
      }

      this.initMap(this.markers && this.markers[0] || location);
    }

    if (this.markers && this.markers.length) {
      this.addMarkers(this.markers);
      this.setCenter(this.markers[0]);
    }

    this.watchIncome();
  }

  watchIncome() {
    this.$scope.$watch('ctrl.markers', markers => {
      this.clearMarkers();
      this.addMarkers(markers);
      this.setCenter(markers[0])
    })
  }

  initMap(center) {
    this.map = new google.maps.Map(this.$element[0].firstChild, {
      center: center,
      zoom: 5
    });
  }

  setCenter(coords) {
    if (!coords) {
      return;
    }
    this.map.setCenter(coords);
    this.map.setZoom(14);
  }

  addMarkers(markers) {
    if (!markers || !markers.length) {
      this.markerInstances = [];
      return;
    }

    this.markerInstances = markers.map( m => {

      return new google.maps.Marker({
        map: this.map,
        position: m
      });
    });
  }

  clearMarkers () {
    if (!this.markerInstances || !this.markerInstances.length) {
      this.markerInstances = [];
      return;
    }
    this.markerInstances.forEach(m => {

      m.setMap(null);
    });
  }

}


