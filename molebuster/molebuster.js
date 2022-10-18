const gameBox$$ = document.querySelector('.game--container');
const playButton$$ = document.querySelector('button');
const holeImg$$ = "../molebuster/dirt.png";
const diggletImg$$ = "../molebuster/digglet.png";
let score$$ = 0;

const play = () => {
    const findHoles$$ = document.querySelectorAll('.hole');
    console.log(findHoles$$);
    
    let timeOut = 1000;
    let before = 0;

    for (let i = 30; i >= 0 ; i--) {
        let random = Math.floor(Math.random()*9);
        setTimeout(() => {
            if(i != 0){
                const count$$ = document.querySelector('.count');
                findHoles$$[before].setAttribute('src', holeImg$$);
                findHoles$$[before].classList.replace('holes', 'digglet');
                
                findHoles$$[random].setAttribute('src', diggletImg$$);
                findHoles$$[random].classList.replace('holes', 'digglet');
                before = random;
            if(i<31){
                count$$.textContent = `00:${i}`;
                count$$.style = "color: red";
            }
            if(i<10){
                count$$.textContent = `00:0${i}`;
                count$$.style = "color: red";
            }if(i === 0){
                count$$.textContent = `00:00`;
                count$$.style = "color: red";
            }
            }

        }, timeOut)

        timeOut += 1000;
        
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

        hole$$.setAttribute('src', holeImg$$);
        hole$$.classList.add('hole')

        div$$.appendChild(hole$$)
    }
    
    play();




}
playButton$$.addEventListener('click', ()=> renderGame())