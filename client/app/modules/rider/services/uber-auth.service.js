export default class UberAuthService {
  constructor(api, $window, $location, $state) {
    'ngInject';

    Object.assign(this, {api, $window, $location, $state});
  }

  authUber(eventId, place) {
    let params = {
      lat: place.lat,
      long: place.long,
      host: this.$location.absUrl().replace(this.$location.path(), '')
    };

    return this.api.get(`events/${eventId}/ride-link`, params)
      .then( (response) => {
        if(response.data.status === 'error') {
          throw response.data.message;
        }
        if(response.data.auth_url) {
          window.location = response.data.auth_url;
        }
        else {
          let params = {
            'link': response.data.ride_url
          };
          this.$state.go('riders.uberRedirect', params);
        }
        return response;
      });
  }

}
