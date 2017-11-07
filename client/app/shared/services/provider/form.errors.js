export default class parseErrorResponse {
  constructor(toastr) {
    'ngInject'
    Object.assign(this, { toastr })
  }

  getErrors(errors, arrayKeys) {
    let formErrors = {}

    Object.keys(errors).map(i => {
      const error = errors[i]
      const errorValue = Array.isArray(error)
        ? error.join('.')
        : error

      if (arrayKeys.indexOf(i) > -1 && !!errorValue) {
        formErrors[i] = errorValue
      }
    })

    this.toastr.error(
      'Some errors occurs during the operation',
      'Error'
    );

    return formErrors
  }
}