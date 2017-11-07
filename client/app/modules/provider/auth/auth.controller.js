export default class ProviderAuthController {
  constructor($state, AuthService) {
    'ngInject';

    this.title = 'BringUsNow';
    Object.assign(this, {$state});

    if (AuthService.isUserLogged()) {
      $state.go('providers.place-list')
    }
  }

  goToLogin() {
    this.$state.go('providers.login');
  }

  goToRegister() {
    this.$state.go('providers.register');
  }

}
