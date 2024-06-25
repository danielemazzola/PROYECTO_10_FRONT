import { changeAvatar } from '../../../services/fetchIsAuth'
import { Alert } from '../../alert/Alert'
import { CardEvent } from '../../cardEvent/CardEvent'

let isOpenToggle = Boolean()
export const openAvatar = (data, token, events) => {
  if (isOpenToggle) {
    isOpenToggle = false
    closeAvatar(events)
    return
  }
  app.innerHTML = `
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
  document.querySelector('.add-avatar').addEventListener('click', () => {
    updateAvatar(token)
  })

  isOpenToggle = true
  return
}

//CLOSE AVATAR COMPONENT
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

// ADD AVATAR
const updateAvatar = (token) => {
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
          Alert(true, 'There was an error, please try again😢' + error)
        }
      } else {
        Alert(true, 'Not selected a image.')
      }
    })
}
