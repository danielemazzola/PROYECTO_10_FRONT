import { dateFormEdit } from '../../../utils/date'
import { editEventForm } from '../../../services/fetchIsAuth'
import { Alert } from '../../alert/Alert'
import { DescriptionEvent } from '../../cardEvent/helpers'
export const FormComponent = (event) => {
  const formEventHTML = `
    <div class="title-create-event">
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

  //EDIT EVENT
  const closeBtn = document.querySelector('#close-btn')
  const containerInfo = document.querySelector('#container-info')
  closeBtn.addEventListener('click', () => {
    document.querySelector('.title-create-event').remove()
    containerInfo.setAttribute('style', 'display:flex; flex-direction:column')
  })

  // FETCH EDIT
  const formGroup = document.querySelector('.form-create-event')
  if (formGroup) {
    formGroup.addEventListener('submit', async (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      let jsonData = {}
      formData.forEach((value, key) => {
        jsonData[key] = value
      })
      const data = await editEventForm(formData, event)
      if (data.status === 201) {
        formGroup.reset()
        const containerInfo = document.querySelector('#container-info')
        containerInfo.setAttribute('style', 'display:flex;')
        const formEdit = document.querySelector('.title-create-event')
        formEdit.remove()
        const containerInfoEvent = document.querySelector('#container-info')
        containerInfoEvent.innerHTML = ``
        DescriptionEvent(data.data.update)
        Alert(false, data.data.message)
      } else {
        Alert(true, data.data.message)
      }
    })
  } else {
    return
  }
}
