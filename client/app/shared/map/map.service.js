export default class MapService {

  constructor(api, $q, $rootScope) {
    'ngInject';

    Object.assign(this, {api, $q, $rootScope});
  }

  updateState() {
    this.$rootScope.$broadcast('map_markers_updated');
  }

}
