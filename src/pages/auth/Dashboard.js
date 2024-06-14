import { isAuth } from '../../services/fetchIsAuth'

export const Dashboard = (token) => {
  profile(token)
}

const profile = async (token) => {
  const app = document.querySelector('#app')
  const { data } = await isAuth(token)
  const divContentUser = document.createElement('div')
  const h3Title = document.createElement('h3')
  h3Title.textContent = data.name
  app.appendChild(divContentUser)
  divContentUser.append(h3Title)
}
