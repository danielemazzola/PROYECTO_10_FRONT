import { editEventForm, createEvent } from '../../../services/fetchIsAuth'
import { Alert } from '../../alert/Alert'
import { CardEvent } from '../../cardEvent/CardEvent'
import { MoreInfo } from '../../cardEvent/helpers'
import { FormEvent } from '../editEvent/template'
import { events } from '../profile/Profile'

export const FormComponent = ({ event, events }) => {
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
  const formGroupEdit = document.querySelector('.form-edit-event')
  if (formGroupEdit) {
    formGroupEdit.addEventListener('submit', (e) =>
      updateEvent(e, event, formGroupEdit)
    )
  }

  // CRETAE NEW EVENT
  const formGroupCreate = document.querySelector('.form-create-event')
  if (formGroupCreate) {
    formGroupCreate.addEventListener('submit', (e) =>
      createNewEvent(e, events, formGroupCreate)
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
  document
    .querySelector('#header')
    .scrollIntoView({ behavior: 'smooth', block: 'start' })
  formCreate.remove()
  CardEvent(events)
}

// EDIT EVENT
const updateEvent = async (e, event, formGroupEdit) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  let jsonData = {}
  formData.forEach((value, key) => {
    jsonData[key] = value
  })
  try {
    const data = await editEventForm(formData, event)
    if (data.status === 201) {
      app.innerHTML = ``
      MoreInfo(data.data.updateEvent)
      formGroupEdit.reset()
      Alert(false, data.data.message)
    } else {
      Alert(true, data.data.message)
    }
  } catch (error) {
    Alert(true, 'An error occurred while editing the event. ' + error)
  }
}

// CREATE NEW EVENT
const createNewEvent = async (e, events, formGroupCreate) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  let jsonData = {}
  formData.forEach((value, key) => {
    jsonData[key] = value
  })
  let tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  if (new Date(jsonData.date) <= tomorrow) {
    Alert(true, 'The date must be more than 24 hours from now.')
    return
  }
  const data = await createEvent(jsonData)
  if (data.status === 200) {
    events.events.push(data.data.newEvent)
    document.querySelector('#app').innerHTML = ``
    CardEvent(events)
    formGroupCreate.reset()
    Alert(false, data.data.message)
  } else {
    Alert(true, data.data.message)
  }
}
