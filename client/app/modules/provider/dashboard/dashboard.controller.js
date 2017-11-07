class DashboardController {
  VIEW_PLACE_DETAIL = 'VIEW_PLACE_DETAIL';
  VIEW_PLACE_EDIT = 'VIEW_PLACE_EDIT';
  VIEW_EVENT_DETAIL = 'VIEW_EVENT_DETAIL';
  VIEW_EVENT_EDIT = 'VIEW_EVENT_EDIT';

  MOBILE_WIDTH = 510

  places = [];
  events = [];
  categories = {};

  activePlace = {};
  activeEvent = {};
  placeMarkers = [];
  detailsViewMode = '';
  isShowPlaceList = true

  constructor(PlaceService, EventService, mapService, $element, $scope, toastr, confirm, $window) {
    'ngInject'
    Object.assign(this, { PlaceService, EventService, mapService, $element, $scope, toastr, confirm, $window })

    this.actions = {
      onSuccessAddEvent: this.successAddEvent.bind(this),
      onSuccessAddPlace: this.successAddPlace.bind(this),
    }
  }

  $onInit() {
    this.PlaceService
      .getPlaces()
      .then(response => this.places = response.data ? response.data.results : [])

    this.PlaceService
      .getPlaceCategories()
      .then(response => response.data.categories
        .map(category => {
          this.categories[category.value] = category.title
        }))

    this.$window.addEventListener('resize', () => {
      this.setPlaceListVisibility()
    })
  }

  handlerClickPlace(placeId) {
    const that = this;
    this.activePlace = Object.assign({}, this.places.filter(place => { return place.id === placeId})[0])

    this.PlaceService
      .getPlaceEvents(placeId)
      .then(response => {
        that.activePlace = response.data || []
        
        if (!that.isMobileVersion()) {
          const mapPoint = that.activePlace.location.point
          if (mapPoint) {
            that.placeMarkers = [{lat: +mapPoint.lat, lng: +mapPoint.long}]
          }
          that.detailsViewMode = that.VIEW_PLACE_DETAIL
        }
        that.events = response.data ? response.data.events : []
      })
  }

  setPlaceListVisibility() {
      this.isShowPlaceList = (!this.isMobileVersion || !this.detailsViewMode)
        && this.detailsViewMode !== this.VIEW_PLACE_DETAIL && this.detailsViewMode !== this.VIEW_PLACE_EDIT
  }

  handlerEventClick(eventId) {
    const that = this
    this.setPlaceListVisibility()

    that.EventService
      .getEvent(eventId)
      .then(response => {
        that.activeEvent = response.data || []
        const dateStartStr = that.activeEvent.start_time
        const dateEndStr = that.activeEvent.end_time

        that.activeEvent.start_time = that.formatDate(dateStartStr)
        that.activeEvent.end_time = that.formatDate(dateEndStr)

        that.detailsViewMode = that.VIEW_EVENT_DETAIL
      })
      .catch(() => that.toastr.error('Error getting event', 'Error'))
  }

  showPlaceEdit() {
    this.detailsViewMode = this.VIEW_PLACE_EDIT
  }

  showPlaceAdd() {
    this.activePlace = {}
    this.detailsViewMode = this.VIEW_PLACE_EDIT
    this.setPlaceListVisibility()
  }

  showEventAdd(placeId, placeAddress) {
    this.activeEvent = {
      place_data: {
        id: placeId,
        location: {
          address: placeAddress
        }
      }
    }
    this.detailsViewMode = this.VIEW_EVENT_EDIT
    this.setPlaceListVisibility()
  }

  showPlaceDetails() {
    const mapPoint = this.activePlace.location.point
    if (mapPoint) {
      this.placeMarkers = [{lat: +mapPoint.lat, lng: +mapPoint.long}]
    }

    this.detailsViewMode = this.VIEW_PLACE_DETAIL
  }

  successAddPlace(newData) {
    newData.events_count = 0

    this.places.push(newData)
    this.activePlace = newData
    this.showPlaceDetails()
  }

  successUpdatePlace() {
    this.places = this.places.map(place => place.id != this.activePlace.id ? place : this.activePlace)
    this.showPlaceDetails()
  }

  successAddEvent(newData) {
    this.activePlace.events_count = ++this.activePlace.events_count
    this.places = this.places.map(place => place.id != this.activePlace.id ? place : this.activePlace)
    this.events.push(newData)
    this.showEventDetails()
  }

  successUpdateEvent() {
    this.events = this.events.map(event => event.id != this.activeEvent.id ? event : this.activeEvent)
    this.detailsViewMode = this.VIEW_EVENT_DETAIL
  }

  openConfirmModal(placeId) {
    this.confirm.open({
      message: 'Are you sure you want to delete place?',
      cb: this.handleDeletePlace.bind(this),
      id: placeId
    });
  }

  openConfirmRemoveEvent() {
    this.confirm.open({
      message: 'Are you sure you want to delete place?',
      cb: this.handleDeleteEvent.bind(this),
      id: this.activeEvent.id
    });
  }

  handleDeletePlace(isConfirm, placeId) {
    if (!!isConfirm) {
      this.PlaceService
        .removePlace(placeId)
        .then(() => {
          this.places = this.places.filter(item => item.id !== placeId)
          this.toastr.success('Place removed successfully', 'Success')
        })
        .catch(() => this.toastr.error('Place wasn\'t removed', 'Error'))
    }
  }

  handleDeleteEvent(isConfirm, eventId) {
    if (!!isConfirm) {

      this.EventService
        .removeEvent(eventId)
        .then(() => {
          this.events = this.events.filter(event => event.id != eventId)
          this.activeEvent = {}

          this.activePlace.events_count = --this.activePlace.events_count
          this.places = this.places.map(place => place.id != this.activePlace.id ? place : this.activePlace)

          this.detailsViewMode = this.VIEW_PLACE_DETAIL
          this.toastr.success('Event removed successfully', 'Success')
        })
        .catch(() => this.toastr.error('Event wasn\'t removed', 'Error'))
    }
  }

  showEventEdit() {
    this.detailsViewMode = this.VIEW_EVENT_EDIT
  }

  showEventDetails() {
    this.detailsViewMode = this.VIEW_EVENT_DETAIL
  }

  showPlaceDetailsMobile() {
    if (!this.activePlace.id) { return }

    this.isShowPlaceList = false

    const mapPoint = this.activePlace.location.point
    if (mapPoint) {
      this.placeMarkers = [{lat: +mapPoint.lat, lng: +mapPoint.long}]
    }

    this.detailsViewMode = this.VIEW_PLACE_DETAIL
  }

  isMobileVersion() {
    return this.$window.innerWidth <= this.MOBILE_WIDTH
  }

  backToPlaceList() {
    this.isShowPlaceList = true
  }

  formatDate(dateStr) {
    if (dateStr instanceof Date) {return ''}

    const date = new Date(dateStr)
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return new Date(`${yyyy}-${mm}-${dd}`);
  }
}

export default DashboardController