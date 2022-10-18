const pokedex$$ = document.querySelector("#pokedex");
const ALL_POKEMONS_INFO = [];
let FILTERED_POKEMONS = [];

const getAllPokemons = () =>
  fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((error) => console.log("Error obteniendo todos los pokemos", error));

const getOnePokemon = async (url) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error obteniendo pokemon individual" + url + error);
  }
};

const input$$ = document.createElement("input");
input$$.classList.add("search_input");
const container$$ = document.querySelector(".container");
const box$$ = document.createElement("div");
box$$.classList.add("box");
const h1$$ = document.querySelector("h1");
container$$.insertBefore(box$$, pokedex$$);

const renderSearch = (pokemons) => {
  const divFinder$$ = document.createElement("div");
  const p$$ = document.createElement("p");

  divFinder$$.classList.add("divFinder");
  input$$.setAttribute("type", "text");
  input$$.setAttribute("placeholder", ". . .");
  p$$.textContent = "Busca tu Pokémon";
  divFinder$$.appendChild(p$$);
  divFinder$$.appendChild(input$$);

  box$$.appendChild(divFinder$$);
};
const renderMessage = () => {
  const messageNotFound$$ = document.createElement("h2");
  messageNotFound$$.textContent = "pokemons no encontrado";
};

let currentFilter = null;

const toFind = (event) => {
  const inputValue = event.target.value.toLowerCase();
  inputValue.length === 0 ? (FILTERED_POKEMONS = ALL_POKEMONS_INFO) : null;
  FILTERED_POKEMONS = ALL_POKEMONS_INFO.filter((pokemon) => {
    const types = pokemon.types.map((type) => type.type.name.toLowerCase());
    if (currentFilter && !types.includes(currentFilter)) {
      return false;
    }
    const matchName = pokemon.name.toLowerCase().includes(inputValue);

    matchType = types.includes(inputValue);

    console.log(pokemon.id, Number(inputValue));
    const matchId = pokemon.id.toString().indexOf(Number(inputValue)) > -1;

    return matchName || matchId || matchType;
  });
  renderPokemons(FILTERED_POKEMONS);
};

const renderToDoLink = () => {
  const divLink$$ = document.createElement("div");
  const a$$ = document.createElement("a");
  a$$.setAttribute("href", "./toDoList/todo.html");
  a$$.textContent = "Crea tu próxima aventura";
  a$$.classList.add("link_to_do");
  divLink$$.classList.add("divLink");
  divLink$$.appendChild(a$$);
  box$$.appendChild(divLink$$);
};

const renderGameLink = () => {
  const gameDiv$$ = document.createElement("div");
  const a$$ = document.createElement("a");
  a$$.setAttribute("href", "./molebuster/molebuster.html");
  a$$.textContent = "minigame";
  a$$.classList.add("game_link");
  gameDiv$$.classList.add("gameDiv");
  gameDiv$$.appendChild(a$$);

  container$$.insertBefore(gameDiv$$, h1$$);
};
let audioDiv = document.createElement("div");
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
      // console.log(currentFilter, element);
      if (currentFilter === element) {
        // console.log('desactivedfilter',currentFilter, element);
        currentFilter = null;
        image$$.classList.remove("type_active");
        FILTERED_POKEMONS = ALL_POKEMONS_INFO;
      } else {
        // console.log('active', currentFilter, element);
        currentFilter = element;
        image$$.classList.add("type_active");
        FILTERED_POKEMONS = ALL_POKEMONS_INFO.filter((pokemon) => {
          return pokemon.types[0].type.name === element;
        });
      }

      renderPokemons(FILTERED_POKEMONS);
    });

    listItem.appendChild(image$$);
    listForIcons$$.appendChild(listItem);
  });

  box$$.appendChild(listForIcons$$);
};

const renderPokemons = (pokemons) => {
  pokedex$$.innerHTML = "";
  if (pokemons.length === 0) {
    const divMessage$$ = document.createElement("div");
    divMessage$$.classList.add("divMessage");

    const message$$ = document.createElement("p");
    const img$$ = document.createElement("img");
    img$$.src = "./assets/images/brokenball.png";
    message$$.textContent = "No_Pokemons_Were_Found";
    message$$.classList.add("not_found_message");
    divMessage$$.appendChild(message$$);
    divMessage$$.appendChild(img$$);
    pokedex$$.appendChild(divMessage$$);
  }

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
    li$$.textContent = `# ${poke.id}`;

    if (poke.types[1]) {
      div$$.textContent = `${poke.types[0].type.name} / ${poke.types[1].type.name}`;
    } else {
      div$$.textContent = `${poke.types[0].type.name}`;
    }

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
};

const init = async () => {
  // console.log("Ejecutando peticiones pokedex... ");

  const allPokemons = await getAllPokemons();

  for (const pokemon of allPokemons) {
    const pokeInfo = await getOnePokemon(pokemon.url);
    ALL_POKEMONS_INFO.push(pokeInfo);
    FILTERED_POKEMONS.push(pokeInfo);
  }
  // console.log('Todos la info de cada pokemon:', ALL_POKEMONS_INFO);

  // console.log("ALL_POKEMONS_INFO", ALL_POKEMONS_INFO);

  renderMessage();
  renderPokemons(ALL_POKEMONS_INFO);
  renderSearch(ALL_POKEMONS_INFO);
  renderIcons();
  renderToDoLink();
  renderGameLink();

  input$$.addEventListener("input", () => toFind(event));
};
window.onload = init;
