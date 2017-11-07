const AUTH_TOKEN = 'auth_token'
const AUTH_USER = 'user'

export default class Auth {
  constructor(api, $q, $window, $state) {
    'ngInject';

    this.user = null;
    Object.assign(this, {api, $q, $window, $state});
  }

  setUser() {
    const that = this

    return that.api.get('me')
      .then(payload => {
          that.user = Object.assign(
            {},
            that.user,
            {
              isVerified: payload.data.verified,
              id: payload.data.user.id
            })
        return that.user
      });
  }

  userSuccessAuth(token) {
    window.localStorage.setItem(AUTH_TOKEN, token)
    return this.setUser()
      .then(() => this.$state.go('providers.place-list'))
  }

  logout() {
    this.user = null;
    this.$window.localStorage.removeItem('auth_token');
  }

  isUserLogged() {
    return !!this.$window.localStorage.getItem('auth_token')
  }

  getUser() {
    return new Promise(resolve => {
      if (this.isUserLogged() || !this.user) {
        this.setUser()
          .then(response => resolve(response))
      } else {
        resolve(this.user)
      }
    })
  }
}