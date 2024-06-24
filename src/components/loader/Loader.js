import './loader.css'

export const Loader = (active) => {
  const loaderHTML = `
    <div class="container-loader">
      <span class="loader"></span>
    </div>
  `
  const body = document.querySelector('body')
  if (body) {
    const loaderElement = document.querySelector('.container-loader')

    if (active) {
      if (!loaderElement) {
        body.insertAdjacentHTML('afterbegin', loaderHTML)
      }
    } else {
      if (loaderElement) {
        loaderElement.remove()
      }
    }
  }
  return null
}
