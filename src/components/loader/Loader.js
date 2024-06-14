import './loader.css'

export const Loader = (active) => {
  const loaderHTML = `
    <div class="container-loader">
      <span class="loader"></span>
    </div>
  `
  const headerElement = document.querySelector('#navSearch')
  const loaderElement = document.querySelector('.container-loader')

  if (active) {
    if (!loaderElement) {
      headerElement.innerHTML += loaderHTML
    }
  } else {
    if (loaderElement) {
      loaderElement.remove()
    }
  }
}
