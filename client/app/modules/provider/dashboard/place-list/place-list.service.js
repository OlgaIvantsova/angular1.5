class PlaceListService {
  constructor(api) {
    'ngInject'

    Object.assign(this, { api })
  }

  getPlaces() {
    return this.api
      .get('places')
  }

  getPlaceCategories() {
    return this.api
      .get('categories')
  }

  getPlaceEvents(placeId) {
    return this.api
      .get(`places/${placeId}`)
  }

  removePlace(placeId) {
    return this.api
      .del(`places/${placeId}`)
  }
}

export default PlaceListService