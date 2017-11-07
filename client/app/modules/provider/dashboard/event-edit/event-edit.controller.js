class EventEdit {
  constructor(EventService, toastr, ParseErrorsService, $scope) {
    'ngInject'
    Object.assign(this, { EventService, toastr, ParseErrorsService, $scope })

    this.errors = {}
    this.copyActiveEvent = Object.assign({}, this.activeEvent)
  }

  handleSaveEventClick() {
    if (this.activeEvent && this.activeEvent.id) {
      this.doUpdateEvent()
    } else {
      this.doAddEvent()
    }
  }

  handleCancelEventClick() {
    this.activeEvent = Object.assign({}, this.copyActiveEvent)
    this.$scope.formEvent.$setPristine();
    // this.showEventDetails()
  }

  doUpdateEvent() {
    this.EventService.saveEvent(this.activeEvent)
      .then(() => {
        this.toastr.success('Event updated successfully', 'Success')
        this.successUpdateEvent()
      })
      .catch((response) =>
        this.errors = this.ParseErrorsService
          .getErrors(
            response.data,
            ["place_data", "description", "title", "start_time", "end_time"]
          )
      )
  }

  doAddEvent() {
    const that = this
    
    that.EventService.addEvent(that.activeEvent)
      .then((response) => {
        that.toastr.success('Event added successfully', 'Success')
        that.parentActions.onSuccessAddEvent(response.data)
      })
      .catch((response) =>
        this.errors = this.ParseErrorsService
          .getErrors(
            response.data,
            ["place_data", "description", "title", "start_time", "end_time"]
          )
      )
  }
}

export default EventEdit