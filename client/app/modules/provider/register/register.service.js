class registerService {
  constructor($http, api) {
    'ngInject'
    Object.assign(this, { $http, api })
  }

  register(data) {
    const { username, first_name, last_name, email, password } = data

    return this.api
      .post(
        'signup',
        {
          username,
          first_name,
          last_name,
          email,
          password
        }
      )
  }
}

export default registerService;