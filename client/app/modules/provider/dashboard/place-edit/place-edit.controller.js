class placeDetailsController {
  constructor( mapService, $element, $scope, PlaceEditService, ParseErrorsService, toastr ) {
    'ngInject';

    Object.assign(this, { mapService, $element, $scope, PlaceEditService, ParseErrorsService, toastr });

    this.errors = {}
    this.copyCurrentPlace = Object.assign({}, this.currentPlace)
    this.copyCurrentPlace.location = Object.assign({}, this.currentPlace.location)
  }

  $onInit() {
    this.placeMarkersEditMode = []

    if (!!this.currentPlace.location) {
      const mapPoint = this.currentPlace.location.point
      this.placeMarkersEditMode = [{lat: +mapPoint.lat, lng: +mapPoint.long}]
    }

    this.initAutocomplete()

    const that = this

    this.$scope.setFiles = (element) => {
      const fd = new FormData()
      fd.append("uploadedFile", element.files[0])

      that.PlaceEditService.uploadPlaceImg(fd)
        .then(() => {
          toastr.success('Image changed successfully', 'Success')
        })
        .catch(() => {
          toastr.error('Image changed successfully', 'Error')
        })
    };
  }

  handleSavePlaceClick() {
    if (this.currentPlace && this.currentPlace.id) {
      this.doUpdatePlace()
    } else {
      this.doAddPlace()
    }
  }

  handleCancelPlaceClick() {
    this.currentPlace = Object.assign({}, this.copyCurrentPlace);
    this.$scope.formPlace.$setPristine();
    const { lat, long } = this.currentPlace.location.point;
    this.placeMarkersEditMode = [{ lat, lng: long }];
  }

  doAddPlace() {
    this.PlaceEditService.addPlace(this.currentPlace)
      .then((response) => {
        this.toastr.success('Place added successfully', 'Success')
        this.parentActions.onSuccessAddPlace(response.data)
      })
      .catch((response) => this.setErrors(response.data))
  }

  doUpdatePlace() {
    this.PlaceEditService.updatePlace(this.currentPlace)
      .then(() => {
        this.toastr.success('Place updated successfully', 'Success')
        this.successUpdatePlace()
      })
      .catch((response) => this.setErrors(response.data)
    )
  }

  setErrors(responseErrors) {
    this.errors = this.ParseErrorsService.getErrors(responseErrors, ["category", "title"])

    const errLocation = responseErrors.location
    if (errLocation) {
      this.errors.location = {}
      if (errLocation.address) {
        this.errors.location.address = errLocation.address.join('.')
      } else if (errLocation.point) {
        this.errors.location.point = "Wrong address. You should choose address from dropdown"
      }
    }
  }

  initAutocomplete() {
    const providerAutocomplite = this.$element[0].querySelector('#provider-autocomplete')
    if (!providerAutocomplite) { return }

    this.autocomplete = new google.maps.places.Autocomplete(providerAutocomplite);
    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace();
      this.location = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};

      this.currentPlace.location = {
        address: place ? place.formatted_address : null,
        point: {
          lat: place ? place.geometry.location.lat() : null,
          long: place ? place.geometry.location.lng() : null
        }
      };

      this.$scope.$apply(() => {
        this.placeMarkersEditMode = [this.location];
      });
    }, this);
  }

}

export default placeDetailsController