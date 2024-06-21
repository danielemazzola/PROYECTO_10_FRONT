import './create.css'
import { menuToggle } from '../profile/helpers'
import { FormComponent } from './helpers'

export const CreateEvent = (events) => {
  menuToggle()
  const app = document.querySelector('#app')
  const cardEvents = document.querySelector('#contain-events')

  if (!cardEvents) {
    app.innerHTML = `
    <div id="contain-events">
        <p id="messageEvents"></p>
        <p id="events-lenght"></p>
        <div id="card-events">
        </div>
      </div>
  `
    cardEvents = document.querySelector('#contain-events')
  }

  document
    .querySelector('#header')
    .scrollIntoView({ behavior: 'smooth', block: 'start' })
  let existComponent = document.querySelector('.contain-create-event')
  if (existComponent) {
    existComponent.remove()
    return
  }
  FormComponent({ events })
}

//EDIT EVENT
export const editEvent = (event) => {
  const containerInfo = document.querySelector('.container-info')
  containerInfo.style.display = 'none'
  const editForm = document.querySelector('.contain-create-event')
  if (editForm) editForm.remove()
  FormComponent({ event })
}
