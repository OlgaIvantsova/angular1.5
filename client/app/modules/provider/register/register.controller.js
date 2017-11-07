export default class RegisterController {
  constructor(RegisterService, ParseErrorsService, AuthService) {
    'ngInject';

    Object.assign(this, { RegisterService, ParseErrorsService, AuthService });
    this.data = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    };

    this.errors = {}
  }

  handlerRegisterClick() {
    const that = this

    this.RegisterService.register(this.data)
      .then((response) => this.AuthService.userSuccessAuth(response.data.token.key))
      .catch((response) => that.errors =
        that.ParseErrorsService
          .getErrors(
            response.data,
            Object.keys(that.data).concat('phone_number')
          )
      );
  }
}
