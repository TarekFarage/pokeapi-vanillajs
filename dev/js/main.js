const searchForm = document.getElementById("search-form")
const resultsDisplay = document.getElementById("results")
const modal = document.getElementById("pokemon-modal")
const pokemonAbilities = document.getElementById("abilities")
const modalImage = document.getElementById("modal-image")
const modalClose = document.getElementById("modal-closer")
const modalTitle = document.getElementById("modal-title")
let activeId
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
                <div class="search-result"><button onclick="showModal(this)" id="${results.name}">${results.name}</button></div>
                
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
  activeId = active.getAttribute("id")
  /*  console.log(activeId) */
  getPokemonInfo()
}

modalClose.addEventListener("click", closeModal)

//getting the clicked name and passing it to the fetch url in order to get all the details for an individual view of the pokemon

const getPokemonInfo = async (pokeDetails) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${activeId}`)
  const pokemonInfo = await res.json()
  console.log(pokemonInfo)

  modalTitle.innerHTML = `
        <h2>${pokemonInfo.name}</h2>
      `

  modalImage.innerHTML = `
      <img src="${pokemonInfo.sprites.front_default}" alt="">
      `
  pokemonInfo.abilities
    .map((pokeSpec) => {
      pokemonAbilities.innerHTML += `
         <span>${pokeSpec.ability.name}</span>
         
         `
    })
    .join("")

  
}

function closeModal() {
  modal.style.display = "none"
  searchForm.value = ""
}
