const gameBox$$ = document.querySelector('.game--container');
const playButton$$ = document.querySelector('button');
const holeImg$$ = "../molebuster/dirt.png";
const dugtriotImg$$ = "../molebuster/dugtrio.png";
let score$$ = 0;

const play = () => {
    const findHoles$$ = document.querySelectorAll('.hole');
    console.log(findHoles$$);
    
    let timeOut = 1000;
    let before = 0;

    for (let i = 20; i >= 0 ; i--) {
        let random = Math.floor(Math.random()*9);
        setTimeout(() => {
            if(i != 0){
                const count$$ = document.querySelector('.count');
                findHoles$$[before].setAttribute('src', holeImg$$);
                findHoles$$[before].classList.replace('hole', 'dugtrio');
                
                findHoles$$[random].setAttribute('src', dugtriotImg$$);
                findHoles$$[random].classList.replace('hole', 'dugtrio');
                before = random;
            if(i<31){
                count$$.textContent = `00:${i}`;
                count$$.style = "color: white";
            }
            if(i<11){
                count$$.textContent = `00:0${i}`;
                count$$.style = "color: red";
            }else{
                count$$.textContent = `00:${i}`;
                count$$.style = "color: white";
            }
               
            }else{
                const count$$ = document.querySelector('.count');
                findHoles$$[random].setAttribute('src', holeImg$$);
                findHoles$$[random].classList.replace('dugtrio','hole');
                count$$.textContent = `00:0${i}`;

                // validation();

            }

        }, timeOut)

        timeOut += 1000;
        
    }


}

const toStrike = (hole$$) =>{
    console.log(hole$$);
  if(hole$$.className.includes('dugtrio')){
    score$$ += 1;
    let updateScore = document.querySelector('.score');
    updateScore.textContent = `Score: ${score$$}`;
  }

}

const renderGame = () =>{
    gameBox$$.innerHTML = "<div class='game'></div>";

    score$$ = 0;

    let updateScore$$ = document.querySelector('.score');
    updateScore$$.textContent = ('Score :', score$$) 

    for (let i = 0; i < 9; i++) {
        const div$$ = document.querySelector('.game');
        const hole$$ = document.createElement('img');

        hole$$.addEventListener('click', () => toStrike(hole$$))

        hole$$.setAttribute('src', holeImg$$);
        hole$$.classList.add('hole')

        div$$.appendChild(hole$$)
    }
    
    play();




}

// const validation = () =>{
//     if(score)

// };
playButton$$.addEventListener('click', ()=> renderGame())

