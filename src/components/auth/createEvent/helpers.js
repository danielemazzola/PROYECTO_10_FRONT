import { editEventForm } from '../../../services/fetchIsAuth'
import { Alert } from '../../alert/Alert'
import { DescriptionEvent, MoreInfo } from '../../cardEvent/helpers'
import { FormEvent } from '../editEvent/template'

export const FormComponent = (event) => {
  const app = document.querySelector('#app')
  const exist = document.querySelector('.contain-create-event')
  if (exist) exist.remove()
  FormEvent(event)

  // VIEW IMAGE
  const img = document.getElementById('file-create')
  if (img) {
    img.addEventListener('change', (e) => addImage(e))
  }

  // EDIT EVENT
  const formGroup = document.querySelector('.form-create-event')
  if (formGroup) {
    formGroup.addEventListener('submit', (e) =>
      updateEvent(e, event, formGroup)
    )
  }

  // CLOSE EVENT
  const btnClose = document.querySelector('#close-btn')
  if (btnClose) {
    btnClose.addEventListener('click', () => closeBtnComponent())
  }
}

//PREVIOUS IMAGE
const addImage = (e) => {
  const fileInput = e.target
  const file = fileInput.files[0]
  if (file) {
    const imgEvent = document.querySelectorAll('#img-event')
    const fileURL = URL.createObjectURL(file)
    imgEvent.forEach((img) => {
      img.src = fileURL
    })
  }
}

// CLOSE EVENT
const closeBtnComponent = () => {
  const formCreate = document.querySelector('.contain-create-event')
  const cardEvents = document.querySelector('.container-info')
  const infoCard = document.querySelector('#contain-events')
  document
    .querySelector('#header')
    .scrollIntoView({ behavior: 'smooth', block: 'start' })
  formCreate.remove()
  if (cardEvents) {
    cardEvents.setAttribute('style', 'display:flex; flex-direction:column')
  } else if (infoCard) {
    infoCard.setAttribute('style', 'display:flex; flex-direction:column')
  }
}

// EDIT EVENT
const updateEvent = async (e, event, formGroup) => {
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
        containerInfo.remove()
        MoreInfo(data.data.updateEvent)
      }
      document.querySelector('.contain-create-event').remove()
      Alert(false, data.data.message)
    } else {
      Alert(true, data.data.message)
    }
  } catch (error) {
    Alert(true, 'An error occurred while editing the event. ' + error)
  }
}
