import './loader.css'

export const Loader = (active) => {
  const loaderHTML = `
    <div class="container-loader">
      <span class="loader"></span>
    </div>
  `
  const appElement = document.querySelector('#app')
  const loaderElement = document.querySelector('.container-loader')

  if (active) {
    if (!loaderElement) {
      appElement.insertAdjacentHTML('afterbegin', loaderHTML)
    }
  } else {
    if (loaderElement) {
      loaderElement.remove()
    }
  }
  return null
}
