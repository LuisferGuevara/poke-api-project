console.log('Js funcionando');

const  h1$$ = document.querySelector('h1');
const box$$ = document.getElementById('box');


const divForToDoList$$ = document.querySelector('.divForToDoList');

document.querySelector('#push').onclick = function(){
    if(document.querySelector('#newtask input').value.length == 0){
        alert("¡Tienes que escribir algo para añadir!")
    }

    else{
        document.querySelector('#tasks').innerHTML += `
            <div class="task">
                <span id="taskname">
                    ${document.querySelector('#newtask input').value}
                </span>
                <button class="delete" style = 'background-color: #f7cd00; width:40px; color: black; '>X</button>
            </div>
        `;

        let current_tasks$$ = document.querySelectorAll(".delete");
        for(let i=0; i < current_tasks$$.length; i++){
            current_tasks$$[i].onclick = function(){
                this.parentNode.remove();
            }
        }
    }
}