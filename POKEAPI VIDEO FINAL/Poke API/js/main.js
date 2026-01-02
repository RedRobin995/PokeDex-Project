const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const main = document.querySelector("main");
const typeColors = {
  normal: "var(--type-normal)",
  fire: "var(--type-fire)",
  water: "var(--type-water)",
  grass: "var(--type-grass)",
  electric: "var(--type-electric)",
  ice: "var(--type-ice)",
  fighting: "var(--type-fighting)",
  poison: "var(--type-poison)",
  ground: "var(--type-ground)",
  flying: "var(--type-flying)",
  psychic: "var(--type-psychic)",
  bug: "var(--type-bug)",
  rock: "var(--type-rock)",
  ghost: "var(--type-ghost)",
  dark: "var(--type-dark)",
  dragon: "var(--type-dragon)",
  steel: "var(--type-steel)",
  fairy: "var(--type-fairy)"
};
let URL = "https://pokeapi.co/api/v2/pokemon/";

let allPokemonData = []; // will store all fetched Pokémon data

async function fetchAllPokemon() {
  for (let i = 1; i <= 1025; i++) {
    const response = await fetch(URL + i);
    const data = await response.json();
    allPokemonData.push(data);
  }
  mostrarLista(allPokemonData); // show all at page load
}

function mostrarLista(pokemonArray) {
  listaPokemon.innerHTML = ""; // clear the list
  pokemonArray.forEach(poke => mostrarPokemon(poke));
}

function mostrarPokemon(poke) {
  let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`).join('');
  let pokeId = poke.id.toString().padStart(3, '0');
  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
    <div class="pokemon">
      <p class="pokemon-id-back">#${pokeId}</p>
      <div class="pokemon-imagen">
        <img src="${poke.sprites.front_default}" alt="${poke.name}">
      </div>
      <div class="pokemon-info">
        <div class="nombre-contenedor">
          <p class="pokemon-id">#${pokeId}</p>
          <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">${tipos}</div>
        // <div class="pokemon-stats">
        //   <p class="stat">0.${poke.height}m</p>
        //   <p class="stat">0.${poke.weight}kg</p>
        // </div>
      </div>
    </div>
  `;
  listaPokemon.append(div);
}

botonesHeader.forEach(boton =>
  boton.addEventListener("click", () => {
    const botonId = boton.id;

    if (botonId === "ver-todos") {
      mostrarLista(allPokemonData);
      main.style.backgroundColor = "var(--clr-gray)";
    } else {
      const filteredPokemon = allPokemonData.filter(poke =>
        poke.types.some(type => type.type.name === botonId)
      );
      mostrarLista(filteredPokemon);

      // 🔥 CAMBIO DE FONDO
      main.style.backgroundColor = typeColors[botonId];
    }
  })
);

fetchAllPokemon();
