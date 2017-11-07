export default class NavBarController {
  constructor(AuthService, $state, $element) {
    'ngInject';

    this.isMenuOpen = false
    this.toggleMenu = this.toggleMenu.bind(this)

    Object.assign(this, { AuthService, $state, $element })
  }

  onLogoClick(e) {
    e.preventDefault()
    this.$state.go('providersAuth')
  }

  toggleMenu() {
    const body = angular.element(document.querySelector('body'))

    this.isMenuOpen = !this.isMenuOpen

    if (this.isMenuOpen) {
      body.on(
        'click',
        () => {
          angular
            .element(document.querySelector('.bar-btn'))
            .removeClass('active')
        }
      )
    }

    if (!this.isMenuOpen) {
      body.unbind('click')
    }

  }

  moveToUserProfile() {
    this.$state.go('providers.profile')
  }

  logout() {
    this.AuthService.logout()
    this.$state.go('providersAuth')
  }
}