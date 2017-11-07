export default class UberCallbackController {

  payload = {
    state: '',
    code: ''
  };

  constructor($location, toastr, uberAuthService, eventsService, api, $window, $state) {
    'ngInject';

    this.rideLink = '';
    Object.assign(this, {$location, toastr, uberAuthService, eventsService, api, $window, $state});
  }

  $onInit() {
    let url = this.$location.url();
    let match = [];

    if(this.$state.params.link) {
      this.rideLink = this.$state.params.link;
      return;
    }

    try {
        match = this.getStateAndCode(url);
        if (!match) {
          throw '';
        }
      } catch (err) {
        this.$state.go('riders.codeConfirm');
        return;
      }

      this.getDeepLink({ state: match[1], code: match[2], host: this.$location.absUrl().replace(this.$location.path(), '').replace(/\?.*$/, '') });

  }

  openRideLink() {
    if(!this.rideLink) return;

    this.eventsService.sendPromocode();

    this.$window.open(this.rideLink);
    this.$state.go('riders.codeConfirm');
  }

  getStateAndCode(url) {
    let match = url.match(/\?state=(.*)&code=(.*)/);

    if (!match || match.length < 3) {
      throw '';
    }

    return match;
  }

  getDeepLink(payload) {
    this.payload = payload;
    return this.api.get('uber/auth/', payload, {skipSlash: true})
      .then(payload => this.onSuccess(payload))
      .catch(error => this.onError());
  }

  saySorry() {
    this.toastr.error('Could not math state from uber. Please, try again', 'Sorry!');
  }

  onSuccess(payload) {
    this.rideLink = payload.data.ride_url;
  }

  onError() {
    this.toastr.error('Error receiving deep link from uber.', 'Sorry!')
  }

}
