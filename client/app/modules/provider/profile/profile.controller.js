export default class ProfileController {
  constructor(ProfileService, AuthService, ParseErrorsService, toastr, $state, confirm, $scope) {
    'ngInject';

    Object.assign(this, { ProfileService, AuthService, ParseErrorsService, toastr, $state, confirm, $scope })

    this.form = {
      data: {
        username: null,
        first_name: null,
        last_name: null,
        email: null,
        phone_number: null
      },
      errors: {}
    }

    AuthService.getUser().then(user => {
      if (!user) { return }

      ProfileService
        .getUser(user.id)
        .then(response => this.form.data = response.data)
        .catch(error => toastr.error('User doesn\'t exist'))
    })
  }

  handleSaveUser() {
    const that = this
    this.ProfileService
      .updateUser(this.form.data)
      .then(response => {
        this.toastr.success('User updated successfully', 'Success')
        this.$state.go('providers.place-list')
      })
      .catch(response => {
        that.form.errors = that
          .ParseErrorsService
          .getErrors(
            response.data,
            Object.keys(that.form.data.user).concat('phone_number')
          )
      })
  }

  handleCancelUser() {
    if (this.$scope.formProfile.$dirty) {
      this.confirm.open({
        message: 'Are you sure you want to cancel changes?',
        cb: this.cancelUserChanges.bind(this)
      });
    } else {
      this.$state.go('providers.place-list')
    }
  }

  cancelUserChanges(isConfirm) {
    if (!!isConfirm) {
      this.toastr.info('Cancel changes user profile', 'Info')
      this.$state.go('providers.place-list')
    }
  }
}
