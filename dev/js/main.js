const searchForm = document.getElementById("search-form")
const resultsDisplay = document.getElementById("results")
const modal = document.getElementById("pokemon-modal")
const modalClose = document.getElementById("modal-closer")
const modalTitle = document.getElementById("modal-title")
let ider
//fetching all the pokemon names
const findPokemon = async (pokeList) => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=900")
  const pokemonList = await res.json()

  //matching the form input to the names
  let searchMatch = pokemonList.results.filter((matched) => {
    const regex = new RegExp(`^${pokeList}`, "gi")
    return matched.name.match(regex)
  })

  //clearing the results when ethe form is empty | might need to change the fact that it gets rid of all the html, so i can animate the results when they disappear
  if (pokeList.length === 0) {
    searchMatch = []
    resultsDisplay.innerHTML = ""
  }
  //callling the function that maps the array and creates the html for each iteration
  createSearched(searchMatch)
}

//showing the matched results
function createSearched(searchMatch) {
  if (searchForm.value.length > 0) {
    const searchResults = searchMatch
      .map(
        (results) =>
          `     
                <div class="search-result"><span><button onclick="showModal(this)" id="${results.name}">${results.name}</button></span></div>
                
            `
      )
      .join("")

    resultsDisplay.innerHTML = searchResults
  }
}

searchForm.addEventListener("input", () => {
  findPokemon(searchForm.value)
})

//need to find a way to not call this even inline in the html witha  dynamic id
function showModal(active) {
  modal.style.display = "block"
  ider = active.getAttribute("id")
  console.log(ider)
  getPokemonInfo()
}

modalClose.addEventListener('click', closeModal)

function closeModal  (){
  modal.style.display = 'none'
  searchForm.value =""
 
  
}

//getting the clicked name and passing it to the fetch url in order to get all the details for an individual view of the pokemon

  const getPokemonInfo = async (pokeDetails) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ider}`)
  const pokemonInfo = await res.json()
      console.log(pokemonInfo)
      

  }