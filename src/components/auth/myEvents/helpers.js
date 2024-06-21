export const myAttendances = (user, events) => {
  return events.events.filter((event) =>
    event.attendees.some((attendee) => attendee.email === user.data.email)
  )
}
