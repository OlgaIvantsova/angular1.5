export default class SearchEventsController {

  pendingRequest = false;
  events = null;
  location = {
    lat: null,
    long: null,
    formatted_address: ''
  };
  markers = [];
  state = 'map';
  searchValue = '';

  constructor(eventsService, $element, $scope, $state, $timeout, toastr, $http) {
    'ngInject';

    Object.assign(this, {eventsService, $element, $scope, $state, $timeout, toastr, $http});
  }

  $onInit() {
    this.initAutocomplete();

    this.setUserLocation();
  }

  setUserLocation() {
    if(navigator.geolocation) {
      this.pendingRequest = true;
      navigator.geolocation.getCurrentPosition( (position) => {
        let location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.markers = [location];

        this.$http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.markers[0].lat},${this.markers[0].lng}&key=AIzaSyCYicqSOHVUM6XS8mkUmYvv5XMssDo7y4A`)
          .then( (response) => {
            this.searchValue = response.data.results[0].formatted_address;
            this.location = {
              lat: response.data.results[0].geometry.location.lat,
              long: response.data.results[0].geometry.location.lng,
              formatted_address: response.data.results[0].formatted_address
            }
            this.pendingRequest = false;
          });

      }, () => {
        this.markers = [];
        this.pendingRequest = false;
      });
    } else {
      this.markers = [];
    }
  }

  search() {

    if (!this.location || this.location.lat === null || this.location.long === null) {
      return;
    }

    this.pendingRequest = true;

    this.eventsService.getEventsByLocation(this.location)
      .then( events => {
        this.events = events;
        this.state = 'events';
      })
      .catch(payload => {
        let msg = payload.data && payload.data.error || payload.statusText || 'Server Error.';

        this.toastr.error(msg, 'Sorry!');
      })
      .finally(() => this.pendingRequest = false);
  }

  initAutocomplete() {
    let autocompleteInput = new google.maps.places.Autocomplete(this.$element[0].querySelector('#autocomplete'));

    autocompleteInput.addListener('place_changed', () => {
      let place = autocompleteInput.getPlace();
      this.location = {
        lat: place.geometry.location.lat(),
        long: place.geometry.location.lng(),
        formatted_address: place.formatted_address
      };

      this.$scope.$apply(() => {
        this.markers = [{
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        }];
      });

    });

  }

  isMap() {
    return this.state === 'map'
  }

  isEvents() {
    return this.state === 'events';
  }

  onSearchValueChange() {
    if (this.state === 'events') {
      this.state = 'map';
      this.events = null;
    }

    Object.assign(this.location, {lat: null, long: null, formatted_address: ''});
  }

}
