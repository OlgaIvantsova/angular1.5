export default class LandingController {
  constructor($window, $document, $scope) {
    'ngInject';

    this.title = 'Landing!';
    this.$window = $window;
    this.$document = $document;
    this.$scope = $scope;

    this.init();
  }

  init() {
    this.state = this.getState(this.$window.innerWidth);

    this.$window.addEventListener('resize', () => {
      let state = this.getState(this.$window.innerWidth);
      if (state !== this.state) {
        this.state = state;
        this.$scope.$digest();
        console.log('get state: ', this.state);
      }
    });
  }

  getState(innerWidth) {
    return innerWidth > 720 ? 'providers' : 'riders';
  }
}
