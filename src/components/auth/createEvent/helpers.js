import { dateFormEdit } from '../../../utils/date'
import { editEventForm } from '../../../services/fetchIsAuth'
import { Alert } from '../../alert/Alert'
import { DescriptionEvent } from '../../cardEvent/helpers'

export const FormComponent = (event) => {
  const app = document.querySelector('#app')
  const exist = document.querySelector('.contain-create-event')
  if (exist) exist.remove()
  const formEventHTML = `
    <div class="contain-create-event">
      <h4>${event ? 'Edit your event' : 'Create your Event'}</h4>
      <form class="form-create-event">
        <input name="title" placeholder="Title: Pizza Lovers" required value="${
          event ? event.title : ''
        }" />
        <textarea name="description" placeholder="Description: Welcome to..." cols="50" rows="10" required>${
          event ? event.description : ''
        }</textarea>
        <input name="location" placeholder="Location: Madrid" required value="${
          event ? event.location : ''
        }" />
        <label class="date-hour">Date and Hour&#8595;</label>
        <input name="date" type="datetime-local" required value="${
          event ? dateFormEdit(event.date) : ''
        }" />
        <div class="option-img-event">
          <label class="add-img-event" for="file-create">
            <img id="img-event" loading="lazy" src="${
              event
                ? event.image
                : 'https://t4.ftcdn.net/jpg/02/17/88/73/360_F_217887350_mDfLv2ootQNeffWXT57VQr8OX7IvZKvB.jpg'
            }" alt="${event ? event.title : 'event-example'}" />
          </label>
          <input name="image" id="file-create" type="file" accept=".png, .jpeg, .jpg" />
        </div>
        <button type="submit">${event ? 'Edit' : 'Create new event'}</button>
        <button type="button" id="close-btn">${
          event ? 'Cancel' : 'Close'
        }</button>
      </form>
    </div>
  `
  app.insertAdjacentHTML('afterbegin', formEventHTML)

  attachEventListeners(event)
}

const attachEventListeners = (event) => {
  // VIEW IMAGE
  document.querySelector('.add-img-event').addEventListener('click', () => {
    const img = document.getElementById('file-create')
    img.addEventListener('change', (e) => {
      const fileInput = e.target
      const file = fileInput.files[0]
      if (file) {
        const imgEvent = document.querySelectorAll('#img-event')
        const fileURL = URL.createObjectURL(file)
        imgEvent.forEach((img) => {
          img.src = fileURL
        })
      }
    })
  })

  // CLOSE EVENT
  const btnClose = document.querySelector('#close-btn')
  btnClose.addEventListener('click', () => {
    const formCreate = document.querySelector('.contain-create-event')
    formCreate.remove()
    const cardEvents = document.querySelector('.container-info')
    const infoCard = document.querySelector('#contain-events')
    if (cardEvents) {
      cardEvents.setAttribute('style', 'display:flex; flex-direction:column')
    } else if (infoCard) {
      infoCard.setAttribute('style', 'display:flex; flex-direction:column')
    }
    reattachMainPageEventListeners()
  })

  // EDIT EVENT
  const formGroup = document.querySelector('.form-create-event')
  formGroup.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    let jsonData = {}
    formData.forEach((value, key) => {
      jsonData[key] = value
    })

    try {
      const data = await editEventForm(formData, event)
      if (data.status === 201) {
        formGroup.reset()

        const containerInfo = document.querySelector('.container-info')
        if (containerInfo) {
          containerInfo.setAttribute(
            'style',
            'display:flex; flex-direction:column'
          )
          DescriptionEvent(data.data.updateEvent)
        }

        document.querySelector('.contain-create-event').remove()
        Alert(false, data.data.message)

        // Reattach the event listeners for main page buttons here
        reattachMainPageEventListeners()
      } else {
        Alert(true, data.data.message)
      }
    } catch (error) {
      Alert(true, 'An error occurred while editing the event. ' + error)
    }
  })
}

const reattachMainPageEventListeners = () => {
  const editEventBtn = document.querySelector('#edit-event')
  if (editEventBtn) {
    editEventBtn.addEventListener('click', handleEditEvent)
  }
}

const handleEditEvent = (event) => {
  // Logic for editing an event
  FormComponent(event)
}
