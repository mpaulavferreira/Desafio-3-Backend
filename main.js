let pokemonList = [];
let currentIndex = 0;

async function fetchPokemonList() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1292');
    const data = await response.json();
    pokemonList = data.results;
  } catch (error) {
    console.error("Erro ao buscar a lista de Pokémons:", error);
  }
}

async function fetchPokemon(pokemonIdentifier) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIdentifier}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar o Pokémon:", error);
  }
}

async function renderPokemon() {

  const pokemonIdentifier = pokemonList[currentIndex].name;
  const pokemonData = await fetchPokemon(pokemonIdentifier);
  
  if (pokemonData) {

    document.getElementById('pokemon-name').textContent = pokemonData.name.toUpperCase();
    document.getElementById('pokemon-image').src = pokemonData.sprites.front_default;

    const types = pokemonData.types.map(t => t.type.name).join(', ');
    document.querySelector('#pokemon-types span').textContent = types;
    
    document.querySelector('#pokemon-height span').textContent = pokemonData.height;

    document.querySelector('#pokemon-weight span').textContent = pokemonData.weight;

    const abilities = pokemonData.abilities.map(a => a.ability.name).join(', ');
    document.querySelector('#pokemon-abilities span').textContent = abilities;
  }
}

document.getElementById('prev-btn').addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? pokemonList.length - 1 : currentIndex - 1;
  renderPokemon();
});

document.getElementById('next-btn').addEventListener('click', () => {
  currentIndex = (currentIndex === pokemonList.length - 1) ? 0 : currentIndex + 1;
  renderPokemon();
});

async function init() {
  await fetchPokemonList();
  renderPokemon();
}

init();
