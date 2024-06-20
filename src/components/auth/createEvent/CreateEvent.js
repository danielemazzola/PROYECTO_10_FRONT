import './create.css'
import { menuToggle } from '../profile/helpers'
import { createEvent } from '../../../services/fetchIsAuth'
import { Alert } from '../../alert/Alert'
import { CardEvent } from '../../cardEvent/CardEvent'
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

  cardEvents.style.display = 'none'
  document
    .querySelector('#header')
    .scrollIntoView({ behavior: 'smooth', block: 'start' })
  let existComponent = document.querySelector('.title-create-event')
  if (existComponent) {
    existComponent.remove()
    cardEvents.setAttribute('style', 'display:flex; flex-direction:column')
    return
  }

  FormComponent()

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
    cardEvents.setAttribute('style', 'display:flex; flex-direction:column')

    document
      .querySelector('#header')
      .scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

export const editEvent = (event) => {
  const containerInfo = document.querySelector('#container-info')
  containerInfo.style.display = 'none'

  FormComponent(event)
}
