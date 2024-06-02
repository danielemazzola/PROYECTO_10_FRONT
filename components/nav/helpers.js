import { ForgotPassword } from './templatesAuth'

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
