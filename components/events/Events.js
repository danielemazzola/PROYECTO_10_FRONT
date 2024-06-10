import('./events.css')
import { cardEvent } from '../cardEvents/cardEvents'

export const Events = () => {
  const eventContent = `
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
  </section>
  `
  cardEvent()
  return eventContent
}