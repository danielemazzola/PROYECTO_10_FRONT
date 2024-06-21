import { Alert } from '../../components/alert/Alert'
import { CardEvent } from '../../components/cardEvent/CardEvent'
import { changeAvatar } from '../../services/fetchIsAuth'
import './dashboard.css'

let isOpenToggle = Boolean()
export const openAvatar = (data, token, events) => {
  if (isOpenToggle) {
    isOpenToggle = false
    closeAvatar(events)
    return
  }
  const containImg = `
  <div id="avatarToggle">
        <div class="containTitleAvatar">
          <h4>Profile</h4>
          <div>
            <label class="add-avatar" for="modified-avatar">&#9998;</label>
              <input id="modified-avatar" type="file" class="modified-avatar" accept="image/*" />
              <img id="avatar-img" alt="avatar by ${data.data.name}" src=${
    data.data.avatar
  } loading='lazy' />
          </div>
        </div>
        <div class="infoToggle">
        <p>Name: <span>${data.data.name}</span></p>
        <p>Lastname: <span>${data.data.lastName}</span></p>
        <p>E-mail: <span>${data.data.email}</span></p>
        <p>Role: ${data.data.roles.map(
          (val, index) => `<span key=${index}> ${val}</span>`
        )}</p>
          </div>
          </div>
          `
  app.innerHTML = containImg
  document.querySelector('.add-avatar').addEventListener('click', () => {
    document.getElementById('modified-avatar').click()
  })
  document
    .getElementById('modified-avatar')
    .addEventListener('change', async (e) => {
      const fileInput = e.target
      const file = fileInput.files[0]

      if (file) {
        const avatar = document.querySelectorAll('#avatar-img')
        const fileURL = URL.createObjectURL(file)

        try {
          const data = await changeAvatar(file, token)
          for (const av of avatar) {
            av.src = `${data.data.updateAvatar.avatar}`
          }
          Alert(data.status !== 201, data.data.message)
        } catch (error) {
          Alert(true, 'There was an error, please try again😢')
        }
      } else {
        console.log('No se seleccionó ningún archivo.')
      }
    })
  isOpenToggle = true
  return
}
const closeAvatar = (events) => {
  CardEvent(events)
  const containImg = document.querySelector('#avatarToggle')
  if (containImg) {
    containImg.style.animation = 'animateClose 0.3s forwards'
    setTimeout(() => {
      containImg.remove()
    }, 300)
    return
  }
}

//CLOSE SESION
export const closeSession = () => {
  localStorage.removeItem('__EVENT_ACCESS__')
  let error = false
  Alert(error, '❤️Thank you for visiting us❤️')
  setTimeout(() => {
    window.location.assign('/')
  }, 3000)
}
