class loginService {
  constructor($http, api) {
    'ngInject'
    Object.assign(this, { $http, api })
  }

  login(data) {
    const { email, password } = data

    return this.api
      .post(
        'login',
        { email, password }
      )
  }
}

export default loginService;