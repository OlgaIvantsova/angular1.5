const BASE_URL = 'https://www.bringusnow.com/api';

class profileService {
  constructor($http) {
    'ngInject'
    Object.assign(this, { $http })
  }

  getUser(userId) {
    return this.$http
      .get(BASE_URL + `/profiles/${userId}`)
  }

  updateUser(data) {
    const { id, first_name, last_name, email } = data.user

    return this.$http
      .put(
        BASE_URL + `/profiles/${id}/`,
        {
          "user": {
            username: email,
            first_name,
            last_name,
            email
          },
          phone_number: data.phone_number
        }
      )
  }
}

export default  profileService