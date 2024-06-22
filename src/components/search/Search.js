import './search.css'
export const SearchBar = (onSearch) => {
  const searchBarContainer = document.createElement('div')
  searchBarContainer.classList.add('search-bar-container')

  const searchInput = document.createElement('input')
  searchInput.type = 'text'
  searchInput.placeholder = 'Search by location...'
  searchInput.classList.add('search-input')
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim()
    onSearch(searchTerm)
  })

  searchBarContainer.appendChild(searchInput)

  return searchBarContainer
}
