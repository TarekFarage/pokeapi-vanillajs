const searchForm=document.getElementById("search-form"),resultsDisplay=document.getElementById("results"),modal=document.getElementById("pokemon-modal"),pokemonAbilities=document.getElementById("abilities"),modalImage=document.getElementById("modal-image"),modalClose=document.getElementById("modal-closer"),modalTitle=document.getElementById("modal-title");let activeId;const findPokemon=async o=>{const e=await fetch("https://pokeapi.co/api/v2/pokemon?limit=900"),t=await e.json();let n=t.results.filter(e=>{var t=new RegExp(`^${o}`,"gi");return e.name.match(t)});0===o.length&&(n=[],resultsDisplay.innerHTML=""),createSearched(n)};function createSearched(e){0<searchForm.value.length&&(e=e.map(e=>`     
                <div class="search-result"><button onclick="showModal(this)" id="${e.name}">${e.name}</button></div>
                
            `).join(""),resultsDisplay.innerHTML=e)}function showModal(e){modal.style.display="block",activeId=e.getAttribute("id"),getPokemonInfo()}searchForm.addEventListener("input",()=>{findPokemon(searchForm.value)}),modalClose.addEventListener("click",closeModal);const getPokemonInfo=async e=>{const t=await fetch(`https://pokeapi.co/api/v2/pokemon/${activeId}`),o=await t.json();console.log(o),modalTitle.innerHTML=`
        <h2>${o.name}</h2>
      `,modalImage.innerHTML=`
      <img src="${o.sprites.front_default}" alt="">
      `,o.abilities.map(e=>{pokemonAbilities.innerHTML+=`
         <span>${e.ability.name}</span>
         
         `}).join("")};function closeModal(){modal.style.display="none",searchForm.value=""}