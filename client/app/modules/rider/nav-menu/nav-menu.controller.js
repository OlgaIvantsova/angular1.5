export default class NavMenuController {

  constructor(authService, $state) {
    'ngInject';

    this.showMenu = false;
    Object.assign(this, {authService, $state});
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.authService.logout().then( (response) => {
      this.$state.go('auth');
    });
  }

}
