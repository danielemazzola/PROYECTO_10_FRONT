import './create.css'
import { menuToggle } from '../profile/helpers'

export const CreateEvent = () => {
  menuToggle()
  const app = document.querySelector('#app')
  const template = `
  <div class="title-create-event">
    <h4>Create your Event</h4>
    <form class="form-create-event">
    <input placeholder='Tilte: Pizza Lovers' />
    <textarea placeholder="Description: Welcome to..." cols="50"></textarea>
    <input placeholder="Location: Madrid" />
    <input type="datetime-local" />
    <div class="option-img-event">
      <label class="add-img-event" for="file-create">&#9998;</label>
      <input id="file-create" type="file" accept="image/*" />
      <img id="img-event" src="https://www.v3rtice.com/wp-content/uploads/2021/06/organizacion-de-eventosblog-v3rtice-1.jpg" alt="event-example" />
    </div>
    <button>Create new event</button>
    <button id="close-btn">Close</button>
    </form>
  </div>
  `
  app.insertAdjacentHTML('afterbegin', template)
  const formCreate = document.querySelector('.title-create-event')
  const btnClose = document.querySelector('#close-btn')
  btnClose.addEventListener('click', () => {
    formCreate.remove()
  })
}
