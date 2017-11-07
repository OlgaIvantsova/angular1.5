export default class RiderAuthController {
  constructor($facebook, $state, toastr, authService) {
    'ngInject';
    this.isLoggedIn = false;
    this.pendingStatus = false;
    this.isAboutBlockOpen = false;
    Object.assign(this, {$facebook, $state, toastr, authService});
  }

  $onInit() {
    this.pendingStatus = true;
    this.authService.getAuthUser().then( (user)=> {
      if(user) {
        user.isVerified
          ? this.$state.go('riders.events')
          : this.$state.go('riders.phoneAuth');

      }
    }, ).finally(() => this.pendingStatus = false);
  }

  login() {
    this.$facebook.login().then( (response) => {
      if (response.authResponse) {
        let access_token = response.authResponse.accessToken;
        return this.authService.sendUserInfo(access_token);
      }
    }).then( (user) => {
      return this.authService.getAuthUser();
    }).then( (user)=> {
      user.isVerified
        ? this.$state.go('riders.events')
        : this.$state.go('riders.phoneAuth');
    }).catch(err => {
      let msg = err.data && err.data.error || err.statusText || 'Server Error.';

      this.toastr.error(msg, 'Sorry!');
    });
  }

  showAboutBlock() {
    this.isAboutBlockOpen = true;
  }

  loginAsProvider() {
    this.$state.go('providersAuth');
  }

}
