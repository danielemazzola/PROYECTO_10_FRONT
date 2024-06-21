import { dateFormEdit } from '../../../utils/date'
export const FormEvent = (event) => {
  const formEventHTML = `
    <div class="contain-create-event">
      <h4>${event ? 'Edit your event' : 'Create your Event'}</h4>
      <form class=${event ? 'form-edit-event' : 'form-create-event'}>
        <input name="title" placeholder="Title: Pizza Lovers" required value="${
          event ? event.title : ''
        }" />
        <textarea name="description" placeholder="Description: Welcome to..." cols="50" rows="10" required>${
          event ? event.description : ''
        }</textarea>
        <input name="location" placeholder="Location: Madrid" required value="${
          event ? event.location : ''
        }" />
        <label class="date-hour">Date and Hour&#8595;</label>
        <input name="date" type="datetime-local" required value="${
          event ? dateFormEdit(event.date) : ''
        }" />
        <div class="option-img-event">
          <label class="add-img-event" for="file-create">
            <img id="img-event" loading="lazy" src="${
              event
                ? event.image
                : 'https://t4.ftcdn.net/jpg/02/17/88/73/360_F_217887350_mDfLv2ootQNeffWXT57VQr8OX7IvZKvB.jpg'
            }" alt="${event ? event.title : 'event-example'}" />
          </label>
          <input name="image" id="file-create" type="file" accept=".png, .jpeg, .jpg" />
        </div>
        <button type="submit">${event ? 'Update' : 'Create new event'}</button>
        <button type="button" id="close-btn">Cancel</button>
      </form>
    </div>
  `
  app.innerHTML = formEventHTML
}
