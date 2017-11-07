class PlaceEditService {
  constructor(api) {
    'ngInject'
    Object.assign(this, { api })
  }

  updatePlace(data) {
    const { id, title, category, location } = data

    return this.api.put(
      `places/${id}`,
      {
        title: title || null,
        category: category || null,
        location: {
          address: location ? location.address : null,
          point: {
            lat: location && location.point ? location.point.lat : null,
            long: location && location.point ? location.point.long : null
          }
        }
      }
    )
  }

  addPlace(data) {
    const { title, category, location } = data

    return this.api.post(
      `places`,
      {
        title: title || null,
        category: category || null,
        location: {
          address: location ? location.address : null,
          point: {
            lat: location && location.point ? location.point.lat : null,
            long: location && location.point ? location.point.long : null
          }
        }
      }
    )
  }

  uploadPlaceImg(formData) {
    return this.api.upload('upload/img', formData)
  }

}

export default PlaceEditService