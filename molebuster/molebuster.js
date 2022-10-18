const gameBox$$ = document.querySelector('.game--container');
const playButton$$ = document.querySelector('button');
const holeImg$$ = "../molebuster/dirt.png";
let score$$ = 0;

const renderGame = () =>{
    gameBox$$.innerHTML = "<div class='game'></div>";

    score$$ = 0;

    let updateScore$$ = document.querySelector('.score');
    updateScore$$.textContent = ('Score :', score$$) 

    for (let i = 0; i < 9; i++) {
        const div$$ = document.querySelector('.game');
        const hole$$ = document.createElement('img');

        hole$$.setAttribute('src', holeImg$$);
        hole$$.classList.add('hole')

        div$$.appendChild(hole$$)
    }
    
    play();




}
playButton$$.addEventListener('click', ()=> renderGame())