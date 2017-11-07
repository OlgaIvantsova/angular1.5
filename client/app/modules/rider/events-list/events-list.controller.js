export default class EventsListController {

  constructor(eventsService, uberAuthService, $element, $scope, $animateCss, $timeout, $q, toastr) {
    'ngInject';
    this.stepTime = 200;

    Object.assign(this, {eventsService, uberAuthService, $element, $scope, $animateCss, $timeout, $q, toastr});
  }

  $onInit() {
    this.markers = [];
  }

  setCardActive($event, eventCard) {
    if (this.activeCard) return;

    let riderLocation = {
      lat: this.place.lat,
      long: this.place.long
    };

    this.eventsService.setActiveCard(eventCard, riderLocation).then( (promocode) => {

      if(promocode) {
        this.setEventMarkers(eventCard);
        if(!event.target.closest) {
          let parent = $event.target.parentElement;
          while(!parent.classList.contains('card')) { // for android browser
            parent = parent.parentElement;
            if(parent.classList.contains('card')) {
              this.activeCard = parent;
              break;
            }
          }
        } else {
          this.activeCard = event.target.closest('.card');
        }

        this.animationStep(() => {
          return this.animationStep(() => this.activeCard.classList.add('flip-step1', 'active'));
        }).then(() => {
          return this.animationStep(() => this.activeCard.classList.add('flip-step2'));
        }).then(() => {
          return this.animationStep(() => this.activeCard.classList.add('flip-step3'));
        });
      } else {
        this.toastr.error('There is no event promocode for now', 'Sorry!');
      }


    }).catch(err => {
      let msg = err.data && err.data.error || err.statusText || 'Server Error.';

      this.toastr.error(msg, 'Sorry!');
    });
  }

  animationStep(cb) {
    cb();
    return this.$q(resolve => {
      this.$timeout(() => {
        resolve();
      }, this.stepTime);
    })
  }

  closeCard(event) {
    event.stopPropagation();
    this.animationStep(() => {
      return this.animationStep(() => this.activeCard.classList.remove('flip-step3'));
    }).then(() => {
      return this.animationStep(() => this.activeCard.classList.remove('flip-step2'));
    }).then(() => {
      return this.animationStep(() => {
        this.activeCard.classList.remove('flip-step1', 'active');
        this.activeCard = '';
      });
    });
  }

  sendRequest($event, event) {
    $event.stopPropagation();

    this.uberAuthService.authUber(event.id, this.place)
      .catch(err => {
        let msg;
        if(typeof err === 'string') {
          msg = err;
        } else {
          msg = err.data && err.data.error || err.statusText || 'Server Error.';
        }

        this.toastr.error(msg, 'Sorry!');
      });
  }

  setEventMarkers(eventCard) {
    let point = {
      lat: +eventCard.place_data.location.point.lat,
      lng: +eventCard.place_data.location.point.long
    };

    this.markers = [point];
  }

}

