export default class LoginController {
  constructor(LoginService, ParseErrorsService, AuthService) {
    'ngInject';

    Object.assign(this, { LoginService, ParseErrorsService, AuthService });


    this.data = {
      email: '',
      password: ''
    }

    this.errors = {}
  }

  handlerLoginClick() {
    const that = this

    this.LoginService
      .login(this.data)
      .then((response) => this.AuthService.userSuccessAuth(response.data.token.key))
      .catch((response) => that.errors = that.ParseErrorsService.getErrors(response.data, Object.keys(that.data)));
  }
}
