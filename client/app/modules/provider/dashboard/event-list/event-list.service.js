export default class EventService {
  constructor(api) {
    'ngInject'

    Object.assign(this, { api })
  }

  getEvent(id) {
    return this.api
      .get(`events/${id}`)
  }

  saveEvent(data) {
    const { id, title, description, start_time, end_time, sms_details } = data

    return this.api
      .put(
        `events/${id}`,
        {
          title,
          description,
          start_time,
          end_time,
          place: data.place_data.id,
          sms_details
        })
  }

  addEvent(data) {
    const { id, title, description, start_time, end_time, sms_details } = data

    return this.api
      .post(
        `events`,
        {
          title,
          description,
          start_time,
          end_time,
          place: data.place_data.id,
          sms_details
        })
  }

  removeEvent(id) {
    return this.api
      .del(`events/${id}`)
  }

  getStripeToket() {
    return this.api.get('stripe-api-key/')
  }

  payEvent(eventId, token) {
    return this.api.post(
      `events/${eventId}/charge`,
      {
        token: token.id
      }
    )
  }
}