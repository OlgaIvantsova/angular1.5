class EventDetails {
  constructor(EventService, toastr) {
    'ngInject'
    Object.assign(this, { EventService, toastr })
  }

  $onInit() {
    const that = this

    this.EventService.getStripeToket()
      .then((response) => { 
        that.stripeHandler = StripeCheckout.configure({
          key: response.data.api_key,
          image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
          locale: 'auto',
          token: token => that.onTokenReceive(token)
        });
      })
      .catch(() => toastr.error('Some errors with stripe init', 'Error'))
  }

  onPay() {
    this.stripeHandler.open({
      name: 'Stripe.com',
      description: '2 widgets',
      zipCode: true,
      amount: 2000
    });
  }

  onTokenReceive(token) {
    const stripeBtn = angular.element(document.querySelector('#stripeBtn'))[0]
    stripeBtn.classList.add('disabled')

    this.EventService
      .payEvent(
        this.activeEvent.id,
        token
      )
      .then(() => {
        stripeBtn.classList.add('hide')
        this.toastr.success('You made payment successfully', 'Success')
      })
      .catch(() => {
        stripeBtn.classList.remove('disabled')
        this.toastr.error('Some error with payment', 'Error')
      })
  }
}

export default EventDetails
