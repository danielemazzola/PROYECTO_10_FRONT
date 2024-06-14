import './loader.css'

export const Loader = (active) => {
  const loaderHTML = `
    <div class="container-loader">
      <span class="loader"></span>
    </div>
  `
  const headerElement = document.querySelector('#app')
  const loaderElement = document.querySelector('.container-loader')

  if (active) {
    if (!loaderElement) {
      headerElement.insertAdjacentHTML('afterbegin', loaderHTML)
    }
  } else {
    if (loaderElement) {
      loaderElement.remove()
    }
  }
}
