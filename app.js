const pokeContainer = document.getElementById("poke-container");
const pokemonCount = 40;
const colors = {
  fire: "rgb(236, 108, 53)",
  grass: "#defde0",
  electric: "#396eeb",
  water: "#7499ef",
  ground: "#ed9e0a",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#f5f5f5",
  fighting: "#e60d4",
  normal: "#f5f5f5",
};

const mainTypes = Object.keys(colors);

const fetchPoke = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPoke(i);
  }
};

const getPoke = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokeCard(data);
};

const createPokeCard = (pokemon) => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const id = pokemon.id.toString().padStart(3, "0");
  const pokeTypes = pokemon.types.map((type) => type.type.name);
  const type = mainTypes.find((type) => pokeTypes.indexOf(type) > -1);
  const color = colors[type];

  pokemonEl.style.backgroundColor = color;

  const pokemonHtml = `
        <div class="img-container">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${pokemon.id}.png" alt="" />
        </div>
        <div class="info">
          <span class="number">#${id}</span>
          <h3 class="name">${name}</h3>
          <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

  pokemonEl.innerHTML = pokemonHtml;
  pokeContainer.appendChild(pokemonEl);
};

fetchPoke();
