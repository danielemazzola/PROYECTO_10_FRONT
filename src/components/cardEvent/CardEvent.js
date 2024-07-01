import './card.css'
import './helpers'
import { date } from '../../utils/date'
import { user } from '../../services/fetchIsAuth'
import {
  MoreInfo,
  handleRegister,
  scrollFunction,
  scrollToTop
} from './helpers'
import { SearchBar } from '../search/Search'

export const CardEvent = async (events) => {
  if (!events) return null
  let reversedEvents = [...events.events].reverse()
  const existContain = document.querySelector('#contain-events')
  if (!existContain) {
    app.innerHTML = `
      <div id="contain-events">
        <h2 id="messageEvents"></h2>
        <div id="search-container"></div>
        <p id="events-length"></p>
        <button id="scrollToTopBtn">🙄</button>
        <div id="card-events">
        </div>
      </div>
    `
  }
  const searchContainer = document.querySelector('#search-container')
  const pMessage = document.querySelector('#messageEvents')
  const pEventsLength = document.querySelector('#events-length')
  pMessage.textContent = events.message
  if (pEventsLength) {
    pEventsLength.textContent = `Total events: ${reversedEvents.length}`
  }

  //SCROLL BUTTON
  const scrollToTopBtn = document.querySelector('#scrollToTopBtn')
  if (scrollToTopBtn) {
    window.addEventListener('scroll', () => scrollFunction(scrollToTopBtn))
    scrollToTopBtn.addEventListener('click', () => scrollToTop())
  }
  // END SCROLL BUTOON

  const renderEvents = (eventsToRender) => {
    const section = document.querySelector('#card-events')
    section.innerHTML = ''

    eventsToRender.forEach((event) => {
      const containerEvents = document.createElement('div')
      containerEvents.id = event._id
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
      const dateP = document.createElement('span')
      title.textContent = `${event.title}`
      dateP.textContent = `Location: ${event.location} | ${date(
        event.date
      )} hours`
      const description = document.createElement('p')
      description.textContent = event.description
      descriptionEvent.classList.add('descriptionEvent')

      containerEvents.appendChild(containerEventsWrapper)
      containerEventsWrapper.appendChild(containerEvent)
      containerEvent.append(bannerEvent)

      bannerEvent.appendChild(imgEvent)
      descriptionEvent.append(title, dateP, description)

      if (Object.keys(user).length === 0) {
        const register = document.createElement('form')
        const name = document.createElement('input')
        const lastName = document.createElement('input')
        const email = document.createElement('input')
        const btnRegisterEvent = document.createElement('input')

        register.classList.add('form-register-event')
        name.name = 'name'
        name.placeholder = 'Name: George'
        name.required = true
        lastName.name = 'lastName'
        lastName.required = true
        lastName.placeholder = 'Last name: Alvarez'
        email.type = 'email'
        email.required = true
        email.name = 'email'
        email.placeholder = 'E-mail: george@email.com'
        btnRegisterEvent.type = 'submit'
        btnRegisterEvent.value = 'Register'
        btnRegisterEvent.classList.add('btn-register-event')
        descriptionEvent.append(register)
        register.append(name, lastName, email, btnRegisterEvent)
        register.addEventListener('submit', async (e) => {
          e.preventDefault()
          handleRegister(event, register)
        })
      } else {
        // TEMPLATE USER AUTH
        const divBtn = document.createElement('div')
        const btnMoreInfo = document.createElement('button')
        divBtn.classList.add('event-more-information')
        btnMoreInfo.classList.add('btn-more-information')
        btnMoreInfo.textContent = 'More Information'
        descriptionEvent.append(divBtn)
        divBtn.append(btnMoreInfo)
        btnMoreInfo.addEventListener('click', () => {
          document
            .querySelector('#header')
            .scrollIntoView({ behavior: 'smooth', block: 'start' })
          MoreInfo(event)
        })
      }

      containerEvent.append(descriptionEvent)
      section.appendChild(containerEvents)
    })
  }

  const renderSearchBar = (onSearch) => {
    const searchBarContainer = SearchBar(onSearch)
    if (searchContainer) searchContainer.appendChild(searchBarContainer)
  }

  renderSearchBar((searchTerm) => {
    if (searchTerm.trim() === '') {
      renderEvents(reversedEvents)
      pEventsLength.textContent = `Total events: ${reversedEvents.length}`
    } else {
      const filteredEvents = reversedEvents.filter((event) =>
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
      pEventsLength.textContent = `Total events: ${filteredEvents.length}`
      if (filteredEvents.length) {
        renderEvents(filteredEvents)
      } else {
        let latestCreatedEvents = reversedEvents.slice(0, 5)
        const existingLatestEvents = document.querySelector(
          '.latest-created-events'
        )
        if (existingLatestEvents) {
          existingLatestEvents.remove()
        }
        const latestEvents = document
          .querySelector('#events-length')
          .insertAdjacentHTML(
            'afterend',
            `
        <p id="events-length" class="latest-created-events">Recommended latest created events: ${latestCreatedEvents.length}</p>
        
        `
          )
        //pEventsLength.textContent = `
        renderEvents(latestCreatedEvents)
      }
    }
  })

  renderEvents(reversedEvents)
}
