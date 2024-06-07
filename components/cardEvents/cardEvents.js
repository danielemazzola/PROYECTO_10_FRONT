import { getEvents } from '../../services/fetchEvents'

export const cardEvent = () => {
  getEvents().then((data) => {
    data.events?.map((event) => {
      const section = document.querySelector('#sectionEvents')
      const containerEvents = document.createElement('div')
      const containerEventsWrapper = document.createElement('div')
      const containerEvent = document.createElement('div')
      containerEvents.classList.add('containerEvents')
      containerEventsWrapper.classList.add('containerEventsWrapper')
      containerEvent.classList.add('containerEvent')

      const bannerEvent = document.createElement('div')

      const imgEvent = document.createElement('img')
      imgEvent.src = event.image
      imgEvent.alt = event.title
      bannerEvent.classList.add('bannerEvent')

      const descriptionEvent = document.createElement('div')
      const title = document.createElement('h2')
      title.textContent = event.title
      const description = document.createElement('p')
      description.textContent = event.description
      descriptionEvent.classList.add('descriptionEvent')

      section.appendChild(containerEvents)
      containerEvents.appendChild(containerEventsWrapper)
      containerEventsWrapper.appendChild(containerEvent)
      containerEvent.append(bannerEvent, descriptionEvent)
      bannerEvent.appendChild(imgEvent)
      descriptionEvent.append(title, description)
    })
  })
}
