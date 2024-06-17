import { Alert } from '../../components/alert/Alert'
import './dashboard.css'

let isOpenToggle = Boolean()
export const openAvatar = (data) => {
  if (isOpenToggle) {
    isOpenToggle = false
    closeAvatar()
    return
  }
  const contain = document.querySelector('#avatarToggle')
  if (contain) contain.remove()

  const containImg = `
      <div id="avatarToggle">
        <div class="containTitleAvatar">
          <h4>Profile</h4>
            <img alt="avatar by ${data.data.name}" src=${
    data.data.avatar
  } loading='lazy' />
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
  app.innerHTML += containImg
  isOpenToggle = true
  return
}
const closeAvatar = () => {
  const containImg = document.querySelector('#avatarToggle')
  containImg.style.animation = 'animateClose 0.3s forwards'
  setTimeout(() => {
    containImg.remove()
  }, 300)
  return
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
