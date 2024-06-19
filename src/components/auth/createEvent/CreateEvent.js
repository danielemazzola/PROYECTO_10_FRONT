import './create.css'
import { menuToggle } from '../profile/helpers'
import { createEvent } from '../../../services/fetchIsAuth'
import { Alert } from '../../alert/Alert'
import { CardEvent } from '../../cardEvent/CardEvent'

export const CreateEvent = (events) => {
  menuToggle()
  const app = document.querySelector('#app')
  const existComponent = document.querySelector('.title-create-event')
  if (existComponent) {
    existComponent.remove()
    return
  }
  const template = `
  <div class="title-create-event">
    <h4>Create your Event</h4>
    <form class="form-create-event">
    <input name="title" placeholder='Tilte: Pizza Lovers' required />
    <textarea name="description"  placeholder="Description: Welcome to..." cols="50" required></textarea>
    <input name="location" placeholder="Location: Madrid" required />
    <label class="date-hour">Date and Hour&#8595;</label>
    <input name="date" type="datetime-local" required />
    <div class="option-img-event">
      <label class="add-img-event" for="file-create">
        <img id="img-event" loading="lazy" src="https://t4.ftcdn.net/jpg/02/17/88/73/360_F_217887350_mDfLv2ootQNeffWXT57VQr8OX7IvZKvB.jpg" alt="event-example" />
      </label>
      <input name="image" id="file-create" type="file" accept="image/*" />
    </div>
    <button>Create new event</button>
    <button id="close-btn">Close</button>
    </form>
  </div>
  `
  app.insertAdjacentHTML('afterbegin', template)

  //VIEW IMAGE
  document.querySelector('.add-img-event').addEventListener('click', () => {
    const img = document.getElementById('file-create')
    img.addEventListener('change', async (e) => {
      const fileInput = e.target
      const file = fileInput.files[0]

      if (file) {
        const imgEvent = document.querySelectorAll('#img-event')
        const fileURL = URL.createObjectURL(file)
        for (const img of imgEvent) {
          img.src = fileURL
        }
      }
    })
  })

  // FETCH CREATE
  const formGroup = document.querySelector('.form-create-event')
  formGroup.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    let jsonData = {}
    formData.forEach((value, key) => {
      jsonData[key] = value
    })
    const data = await createEvent(jsonData)
    if (data.status === 200) {
      events.events.push(data.data.newEvent)
      document.querySelector('#card-events').innerHTML = ``
      CardEvent(events)

      formGroup.reset()
      document.getElementById('img-event').src =
        'https://t4.ftcdn.net/jpg/02/17/88/73/360_F_217887350_mDfLv2ootQNeffWXT57VQr8OX7IvZKvB.jpg'
      Alert(false, data.data.message)
    } else {
      Alert(true, data.data.message)
    }
  })

  //CLOSE COMPONENT
  const formCreate = document.querySelector('.title-create-event')
  const btnClose = document.querySelector('#close-btn')
  btnClose.addEventListener('click', () => {
    formCreate.remove()
  })
}
