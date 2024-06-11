export const Dashboard = () => {
  document.querySelector('#app').innerHTML = ``
  const template = `
    <div>
      <h1>Hola mundo</h1>
    </div>
  `
  return template
}
