export default class AuthService {

  user = null;

  constructor(api, $q, $window, $facebook) {
    'ngInject';

    Object.assign(this, {api, $q, $window, $facebook});
  }

  getUser() {
    return this.api.get('me').then(payload => {
      this.user = Object.assign({}, payload.data.user, {
        isVerified: payload.data.verified,
      });
      this.$window.localStorage.setItem('auth_token', payload.data.user.token.key);

      return this.user;
    });
  }

  getAuthUser() {
    return this.$facebook.getLoginStatus().then(response => {
      let isLoggedIn = response.status;
      let token = this.$window.localStorage.getItem('auth_token');
      if(!token || isLoggedIn !== 'connected') {
        this.user = null;
        this.$window.localStorage.removeItem('auth_token');
        return this.$q.reject('auth');
      } else {
        this.user = this.getUser();
        return this.user;
      }
    });
  }

  logout() {
    return this.api.get('logout').then( (response) => {
      if(response.data.success) {
        this.user = null;
        this.$window.localStorage.removeItem('auth_token');
        return response;
      }
    });
  }

  sendUserInfo(access_token) {
    let data = {access_token};

    return this.api.post('facebook/login', data).then( (response) => {
      this.user = {
        id: response.data.user.id,
        isVerified: false
      };
      this.$window.localStorage.setItem( 'auth_token', response.data.user.token.key );
      return this.user;
    });
  }

  verifyPhone(phoneNumber) {
    let id = this.user.id;
    let data = {
      "phone_number": phoneNumber
    };

    return this.api.patch(`profiles/${id}`, data).then( (response) => {
      if(response) {
        return response;
      }
    });
  }

  verifyCode (code) {
    return this.api.post('verify/phone', {"code": code}).then( (response) => {
      if(response.data || response.data.status === 'success') {
        this.user.isVerified = true;
        return true;
      } else {
        return false;
      }
    }, (err) => {
      return false;
    });

  }

}
