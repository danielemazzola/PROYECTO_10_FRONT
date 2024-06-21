import { editEventForm, createEvent } from '../../../services/fetchIsAuth'
import { Alert } from '../../alert/Alert'
import { CardEvent } from '../../cardEvent/CardEvent'
import { MoreInfo } from '../../cardEvent/helpers'
import { FormEvent } from '../editEvent/template'

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
    btnClose.addEventListener('click', () => closeBtnComponent(events))
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
const closeBtnComponent = (events) => {
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
      formGroupEdit.reset()
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

// CREATE NEW EVENT
const createNewEvent = async (e, events, formGroupCreate) => {
  e.preventDefault()
  console.log(events)
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
    formGroupCreate.reset()
    document.getElementById('img-event').src =
      'https://t4.ftcdn.net/jpg/02/17/88/73/360_F_217887350_mDfLv2ootQNeffWXT57VQr8OX7IvZKvB.jpg'
    Alert(false, data.data.message)
  } else {
    Alert(true, data.data.message)
  }
}
