console.log('Js funcionando');

const  h1$$ = document.querySelector('h1');
const box$$ = document.getElementById('box');


const divForToDoList$$ = document.querySelector('.divForToDoList');

// const input$$ = document.createElement('input');
// input$$.setAttribute('type', 'text');
// const button$$ = document.createElement('button');
// button$$.textContent= 'Añadir';
// button$$.style = 'background-color= white; '
// divForToDoList$$.appendChild(input$$)
// divForToDoList$$.appendChild(button$$)

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
        for(var i=0; i<current_tasks$$.length; i++){
            current_tasks$$[i].onclick = function(){
                this.parentNode.remove();
            }
        }
    }
}