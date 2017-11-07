class PlaceListController {
  constructor() {}

  listItemClick(e) {
    if (e.target.classList.contains('dropdown-item')) {
      return
    }

    this.handlerClickPlace()
  }
}

export default PlaceListController