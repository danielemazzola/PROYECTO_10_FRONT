import '../navs/nav.css'
import { fetchRegister, fetchForgotPassword } from '../../services/fetchAuth'

export const btnCloseComponent = () => {
  const btnClose = document.querySelector('.closeContainer')
  btnClose.addEventListener('click', () => {
    auth.classList.add('animate-close')
    setTimeout(() => {
      auth.removeAttribute('class')
      auth.remove()
    }, 100)
  })
}

export const handleRegister = () => {
  console.log('Register Function')
  const registerContainer = document.querySelector('.nav')
  const formRegister = document.querySelector('#register-form')
  const msgDiv = document.createElement('div')
  const msgP = document.createElement('p')
  if (!formRegister) return
  formRegister.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    let jsonData = {}
    formData.forEach((value, key) => {
      jsonData[key] = value
    })
    msgP.textContent = ''
    const data = await fetchRegister(jsonData)
    msgDiv.setAttribute(
      'style',
      'display:flex; justify-content:center; align-items:center; margin-top: 20px;'
    )
    msgP.textContent = data.data.message

    if (data.status === 409) {
      const formlogin = document.querySelector('#formlogin')
      const btnLogin = formlogin.querySelector('button')
      btnLogin.setAttribute('style', 'background-color:red;')
    }
    if (data.status === 201) {
      registerContainer.classList.add('animate-close')
      setTimeout(() => {
        registerContainer.removeAttribute('style')
        registerContainer.remove()
      }, 1000)
    }
    auth.append(msgDiv)
    msgDiv.append(msgP)
  })
}

export const handleForgotPassword = () => {
  const forgotContainer = document.querySelector('.forgot-password-container')
  const formForgot = document.querySelector('.forgot-password-form')
  const msgDiv = document.createElement('div')
  const msgP = document.createElement('p')
  if (!formForgot) return
  formForgot.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log(formForgot)
    const formData = new FormData(e.target)
    let jsonData = {}
    formData.forEach((value, key) => {
      jsonData[key] = value
    })
    console.log(jsonData)
    msgP.textContent = ''
    console.log(jsonData)
    const data = await fetchForgotPassword(jsonData)
    msgDiv.setAttribute(
      'style',
      'display:flex; justify-content:center; align-items:center; margin-top: 20px;'
    )
    msgP.textContent = data.data.message

    if (data.status === 404) {
      const formlogin = document.querySelector('#formlogin')
      const btnLogin = formlogin.querySelector('button')
      btnLogin.setAttribute('style', 'background-color:red;')
    }
    if (data.status === 200) {
      forgotContainer.classList.add('animate-close')
      setTimeout(() => {
        forgotContainer.removeAttribute('style')
        forgotContainer.remove()
      }, 1000)
    }
    auth.append(msgDiv)
    msgDiv.append(msgP)
  })
}
