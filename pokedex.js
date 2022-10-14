fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
.then((data) => data.json())
.then((pokemons) => print(pokemons));

const container$$ = document.querySelector('.container');

function print(pokemons){

    for (const pokemon of pokemons.results) {
        const div$$ = document.createElement('div');

        container$$.appendChild(div$$)

        
    }

}

