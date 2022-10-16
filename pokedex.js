/**
 * Requisitos
 * - Obtener lista pokedex y guardar en variable ✅
 * - Obtener el listado de todos los pokemons ✅
 * - Obtener todos los pokemons individuales uno por uno ✅
 * - Para obtener todos los pokemons, me dice el ejercicio que debo iterar uno por uno. ✅
 * - Añadir al DOM los pokemons, dentro del div pokedex. ☑️
 */

const pokedex$$ = document.querySelector("#pokedex");
const ALL_POKEMONS_INFO = []; // Cuando una variable se declara en el scope global para ser usada por otros, se escribe en mayúsculas
let FILTERED_POKEMONS = [];

function getAllPokemons() {
  return fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((error) => console.log("Error obteniendo todos los pokemos", error));
}
function getOnePokemon(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => response)
    .catch((error) => console.log("Error obteniendo pokemon individual", error));
}

const input$$ = document.createElement("input");
input$$.classList.add("search_input");
const container$$ = document.querySelector(".container");
const box$$ = document.createElement("div");
box$$.classList.add("box");
container$$.insertBefore(box$$, pokedex$$);

const renderSearch = (pokemons) => {
  const divFinder$$ = document.createElement("div");
  const p$$ = document.createElement("p");

  divFinder$$.classList.add("divFinder");
  input$$.setAttribute("type", "text");
  p$$.textContent = "Need to find specifically ?";
  divFinder$$.appendChild(p$$);
  divFinder$$.appendChild(input$$);

  box$$.appendChild(divFinder$$);
};

const toFind = (event) => {
  const inputValue = event.target.value.toLowerCase();
  FILTERED_POKEMONS = ALL_POKEMONS_INFO.filter((pokemon) => {
    const match = pokemon.name.toLowerCase().includes(inputValue);
    return match;
  });
  renderPokemons(FILTERED_POKEMONS);
};

let audioDiv = document.createElement("div");

const renderPokemons = (pokemons) => {
  pokedex$$.innerHTML = "";

  for (const poke of pokemons) {
    const li$$ = document.createElement("li");
    li$$.classList.add("card");

    const img$$ = document.createElement("img");
    img$$.classList.add("card-image");
    img$$.src = poke.sprites.front_default;
    img$$.alt = poke.name;

    const p$$ = document.createElement("p");
    p$$.classList.add("card-title");
    p$$.textContent = poke.name;

    const div$$ = document.createElement("div");
    div$$.classList.add("card-subtitle");

    li$$.classList.add(poke.types[0].type.name);

    li$$.appendChild(img$$);
    li$$.appendChild(p$$);
    li$$.appendChild(div$$);

    pokedex$$.appendChild(li$$);

    const cries = "https://play.pokemonshowdown.com/audio/cries/src/" + poke.name + ".wav";
    li$$.addEventListener("click", () => {
      audioDiv.innerHTML = `<audio autoplay="autoplay">
        <source src=${cries} type="audio/x-wav">
      </audio>`;
      document.body.appendChild(audioDiv);
    });
  }
}

const renderIcons = () => {
  const pokeIcons = [
    "bug",
    "dragon",
    "electric",
    "fairy",
    "fighting",
    "fire",
    "ghost",
    "grass",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "water",
  ];

  const listForIcons$$ = document.createElement("ul");
  listForIcons$$.classList.add("icon-list");
  pokeIcons.forEach((element) => {
    const listItem = document.createElement("li");
    listItem.className = "icon-imagen";
    const image$$ = document.createElement("img");
    image$$.src = `./assets/images/${element}.png`;
    image$$.addEventListener("click", () => {
      FILTERED_POKEMONS = FILTERED_POKEMONS.filter((pokemon) => {
        return pokemon.types[0].type.name === element;
      });
      renderPokemons(FILTERED_POKEMONS);
      FILTERED_POKEMONS = ALL_POKEMONS_INFO;
    });

    listItem.appendChild(image$$);
    listForIcons$$.appendChild(listItem);
  });

  box$$.appendChild(listForIcons$$);
}

//Director de orquesta, irá llamando a otras funciones

async function init() {
  console.log("Ejecutando peticiones pokedex... ");

  const allPokemons = await getAllPokemons(); // array de onjetos con name y url por cada pokemon
  // console.log('all Pokemons:', allPokemons);

  //Itero por el array de pokemons, llamo a getOnePokemon una vez
  //por cada pokemon, pasándole la url de cada pokemon.
  for (const pokemon of allPokemons) {
    // Pido a la api la información de cada pokemon indivudual y la guardo en una variable
    const pokeInfo = await getOnePokemon(pokemon.url);
    ALL_POKEMONS_INFO.push(pokeInfo);
    FILTERED_POKEMONS.push(pokeInfo);
  }
  // console.log('Todos la info de cada pokemon:', ALL_POKEMONS_INFO);

  console.log("ALL_POKEMONS_INFO", ALL_POKEMONS_INFO);

  renderPokemons(ALL_POKEMONS_INFO);
  renderSearch(ALL_POKEMONS_INFO);

  input$$.addEventListener("input", () => toFind(event));
  renderIcons();
}
window.onload = init;
