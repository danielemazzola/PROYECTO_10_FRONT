import './create.css'
import { menuToggle } from '../menu/helpers'
import { FormComponent } from './helpers'

export const CreateEvent = (events) => {
  menuToggle()
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
