console.log("Js funcionando");

const h1$$ = document.querySelector("h1");
const box$$ = document.getElementById("box");

const para$$ = document.querySelector(".description");
const nurseDiv$$ = document.createElement('img');
nurseDiv$$.classList.add('nursediv')
nurseDiv$$.src = "./Cute Nurse Joy Kandi Pattern.png"
box$$.insertBefore(nurseDiv$$,para$$)


document.querySelector("#push").onclick = function () {
  if (document.querySelector("#newtask input").value.length == 0) {
    alert("¡Tienes que escribir algo para añadir!");
  } else {
    document.querySelector("#tasks").innerHTML += `
            <div class="task">
                <span id="taskname">
                    ${document.querySelector("#newtask input").value}
                </span>
                <button class="delete" style = 'background-color: #f7cd00; width:40px; color: black; '>X</button>
            </div>
        `;

    let current_tasks$$ = document.querySelectorAll(".delete");
    for (let i = 0; i < current_tasks$$.length; i++) {
      current_tasks$$[i].onclick = function () {
        this.parentNode.remove();
      };
    }
  }
};


// FUNCTION WORD BY WORD. BY GOOGLE HAHAHA

function write(contenedor,writer,speed){

   longitud = writer.length;

   cnt = document.getElementById(contenedor);
   let i=0;
   tiempo = setInterval(function(){
      cnt.innerHTML = cnt.innerHTML.substr(0,cnt.innerHTML.length-1) + writer.charAt(i)+ " ";
      if(i >= longitud){
         clearInterval(tiempo);
         cnt.innerHTML = cnt.innerHTML.substr(0,longitud);
         return true;
      } else {
         i++;
      }},speed);
};

let texto =  "Bienvenido entrenador Pokemón. En esta sección podrás crear tu propia To Do List. Para ser un buen entrenador y un buen programador, debes organizarte bien. Así que ahora puedes utilizar esta herramienta para añadir tus tareas por hacer; o todos los accesorios que necesitas tener andes de salir a cazar pokemons. Una vez los tengas, podrás eliminarlos. ";
$("#write").click(function() {
write("text",texto,100);
});
