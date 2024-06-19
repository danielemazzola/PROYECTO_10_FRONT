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
      <label class="add-img-event" for="file-create">
        <img id="img-event" loading="lazy" src="https://t4.ftcdn.net/jpg/02/17/88/73/360_F_217887350_mDfLv2ootQNeffWXT57VQr8OX7IvZKvB.jpg" alt="event-example" />
      </label>
      <input id="file-create" type="file" accept="image/*" />
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
