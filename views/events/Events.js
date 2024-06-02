import('./events.css')

export const Events = () => {
  const section = document.createElement('section')
  section.id = 'sectionEvents'

  const containerWrapper = document.createElement('div')
  containerWrapper.className = 'containerEventsWrapper'

  const eventContent = `
    <div class="containerEvents"> 
      <div class="bannerEvent">
        <img src="../../images/pizza.jpg" />
      </div>
      <div class="descriptionEvent">
        <h2>Titulo</h2>
        <p>Descripción Descripción Descripción Descripción Descripción Descripción Descripción </p>
      </div>
    </div>
  `

  containerWrapper.innerHTML = eventContent
  section.appendChild(containerWrapper)

  return section
}
