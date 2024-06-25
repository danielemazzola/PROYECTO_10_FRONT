import('./home.css')
import { getAllEvents } from './helpers'

export const Home = () => {
  const view = `
    <section id="sectionEvents">
      <div class="infoWelcome">
        <div class="title">
          <h1>Tu Guía a Experiencias <span>Inolvidables❤️</span></h1>
        </div>
        <div class="description">
          <p>
            ¡Bienvenido a los mejores Eventos de tu ciudad! Aquí encontrarás una selección de los eventos más emocionantes y únicos. Puedes suscribirte a cualquier evento que te interese sin necesidad de crear una cuenta. Sin embargo, si deseas acceder a información detallada como la cantidad de asistentes y otras estadísticas, te invitamos a registrarte. Únete a nuestra comunidad y no te pierdas ningún momento épico.
          </p>
        </div>
      </div>
      <div id="contain-events">
        <p id="messageEvents"></p>
        <div id="search-container"></div>
        <p id="events-length"></p>
        <button id="scrollToTopBtn">🙄</button>
        <div id="card-events">
        </div>
      </div>
    </section>
    `
  document.getElementById('app').innerHTML = view
  getAllEvents()

  return view
}
