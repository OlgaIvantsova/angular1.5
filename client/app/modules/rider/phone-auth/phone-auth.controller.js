export default class PhoneAuthController {

  phoneNumber = '';
  isCodeConfirmOpen = false;
  showCodeMsg = false;
  pendingRequest = false;

  constructor($state, $q, toastr, authService, $scope) {
    'ngInject';

    Object.assign(this, {$state, $q, toastr, authService, $scope});
  }

  submitPhone() {
    this.pendingRequest = true;
    return this.authService.verifyPhone(`+1${this.phoneNumber}`)
      .then( (user)=> {
        if(user) {
          this.isCodeConfirmOpen = true;
        }
      }).catch(err => {
        let msg = err.data && err.data.error || err.statusText || 'Server Error.';

        this.toastr.error(msg, 'Sorry!');
      }).finally(() => this.pendingRequest = false);
  }

  submitCode() {
    this.showCodeMsg = false;
    this.pendingRequest = true;

    return this.authService.verifyCode(this.codeNumber)
      .then( (verified)=> {
        if(!verified) {
          this.showCodeMsg = true;
        } else {
          this.isCodeConfirmOpen = false;
          this.$state.go('riders.events');
        }
      }).catch(err => {
        let msg = err.data && err.data.error || err.statusText || 'Server Error.';

        this.toastr.error(msg, 'Sorry!');
      }).finally(() => this.pendingRequest = false);
  }

}
