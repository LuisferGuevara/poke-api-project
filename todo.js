console.log('Js funcionando');

const  h1$$ = document.querySelector('h1');
const box$$ = document.getElementById('box');


const divForToDoList$$ = document.querySelector('.divForToDoList');
const input$$ = document.createElement('input');
input$$.setAttribute('type', 'text');
const button$$ = document.createElement('button');
button$$.textContent= 'Añadir';
button$$.style = 'background-color= white; '
divForToDoList$$.appendChild(input$$)
divForToDoList$$.appendChild(button$$)

