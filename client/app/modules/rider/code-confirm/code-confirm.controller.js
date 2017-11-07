export default class CodeConfirmController {

  constructor(toastr, eventsService, $state, $timeout) {
    'ngInject';

    Object.assign(this, { toastr, eventsService, $state, $timeout });
    this.smsDetailsText = 'when you get there please ask for the secret code';
  }

  $onInit() {
    if(this.eventsService.activeCard.event) {
      this.smsDetailsText = this.eventsService.activeCard.event.sms_details;
    }
  }

  submitCode() {
    this.eventsService.confirmSecretCode(this.code).then( (response) => {
      this.toastr.info('Success!');
      this.$timeout(() => {
        this.$state.go('riders.events');
      }, 1000);

    }).catch(err => {
      let msg;
      if(typeof err === 'string') {
        msg = err;
      } else {
        msg = err.data && err.data.error || err.statusText || 'Server Error.';
      }

      this.toastr.error(msg, 'Sorry!');
    });
  }


}
