import('./navSearch.css')
export const Search = () => {
  const search = document.createElement('div')
  search.innerHTML = `
    <div id="navSearch">
      <div>
        <select>
          <option>🔎Search Events🔎</option>
          <option>Alicante</option>
          <option>Alicante</option>
        </select>
      </div>
    </div>
  `
  return search
}
