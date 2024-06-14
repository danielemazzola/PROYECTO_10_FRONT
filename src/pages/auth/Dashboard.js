import { isAuth } from '../../services/fetchIsAuth'

export const Dashboard = (token) => {
  const view = `
    <div>
      <h1>Hola mundo</h1>
    </div>
  `
  const profile = async (token) => {
    const data = await isAuth(token)
    console.log(data)
  }
  profile(token)
  return view
}
