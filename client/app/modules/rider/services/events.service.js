export default class EventsService {

  constructor(api, $q, toastr) {
    'ngInject';

    Object.assign(this, {api, $q, toastr});

    this.activeCard = {};
  }

  getEventsByLocation(location) {

    return this.api.get('events', location).then( (response) => {
      return response.data.results;
    });
  }

  setActiveCard(event, riderLocation) {
    return this.api.get(`events/${event.id}`, riderLocation).then( (response) => {
      this.activeCard = response.data;
      return this.activeCard.promocode;
    });

  }

  sendPromocode() {
    let promocode = this.activeCard.promocode;

    return this.api.post('apply-promocode', {promocode}).then( (response) => {
      console.log(response);
    }).catch(err => {
      let msg;
      if(err.data.error[0]) {
        msg = err.data.error[0].title;
      } else {
        msg = err.data && err.data.error || err.statusText || 'Server Error.';
      }
      this.toastr.error(msg, 'Sorry!');
    });
  }

  confirmSecretCode(code) {
    return this.api.post('submit-code', {code}).then( (response)=> {
      if(response.data.code) {
        throw response.data.code[0];
      } else {
        return response;
      }
    });
  }

}

