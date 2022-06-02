console.log ("Segunda Entrega Trabajo Final - Nicolas Pablo Ivan Pedicino")

//---------------------------------------------------


console.table(peliculas)

let carrito=[]

if(localStorage.getItem("carrito")!=null){
   carrito=JSON.parse(localStorage.getItem("carrito"));
   actualizarTabla()
}else{
   carrito=[]
}
imprimirProductosEnHTML(peliculas);

function imprimirProductosEnHTML(peliculas) {
  let contenedor = document.getElementById("contenedor");

  for (const pelicula of peliculas) {
    let card = document.createElement("div");

    card.innerHTML = `
        <div  id= "card" class="card text-center" style="width: 20rem; height=30rem" >
            <div class="card-body">
                <img src="${pelicula.imagen}" id="card" class="card-img-top img-fluid" alt="Peliculas">
                <h2 class="card-title">${pelicula.nombre}</h2>
                <h5 class="card-subtitle mb-2 text-muted">${pelicula.formato}</h5>
                <p class="card-text">$${pelicula.precio}</p>
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button id="btn${pelicula.id}" type="button" class="btn btn-dark">Comprar Pelicula </button>
                </div>
            </div>
        </div>      
        `;
    contenedor.append(card);
  }
    peliculas.forEach(pelicula => {
    document.getElementById(`btn${pelicula.id}`).addEventListener('click', function() {
       agregarAlCarrito(pelicula);
     });
   });

}
//---------------------------------------------------

//intento de filtro// No anda xD//

const busqueda = document.querySelector('#buscador');
const resultado = document.querySelector('.pelicula');
console.log(resultado);


const filtrar = ()=>{
   resultado.innerHTML=''

   const texto = busqueda.value();

   for (let pelicula of peliculas) {
     let card = document.createElement("div");
     if (nombre.indexOf(texto) !== -1){
       card.innerHTML = `
       <div  id= "card" class="card text-center" style="width: 20rem; height=30rem" >
            <div class="card-body">
                <img src="${pelicula.imagen}" id="card" class="card-img-top img-fluid" alt="Peliculas">
                <h2 class="card-title">${pelicula.nombre}</h2>
                <h5 class="card-subtitle mb-2 text-muted">${pelicula.formato}</h5>
                <p class="card-text">$${pelicula.precio}</p>
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button id="btn${peliculas.id}" type="button" class="btn btn-dark">Comprar Pelicula </button>
                </div>
            </div>
        </div>        
         ` 
         resultado.appendChild(card);
    
  };
}
      if (resultado.innerHTML === ''){
        let noLaTengo = document.createElement("div");
        noLaTengo.pelicula.nombre = "noLaTengo"
        noLaTengo.innerHTML = `<h3> La pelicula aun no llego a nuestro catalogo ... </h3>`
        resultado.appendChild(noLaTengo);
      }
    }
 busqueda.addEventListener('keyup', filtrar);

//---------------------------------------------------

 //agregar al carrito

function agregarAlCarrito(nuevaPelicula) {
   carrito.push(nuevaPelicula);
   console.log(carrito);
   alert("Agregamos la pelicula "+nuevaPelicula.nombre+" al carrito!")
   document.getElementById("tabla").innerHTML+=`
   <tr>
       <td>${nuevaPelicula.formato}</td>
       <td>${nuevaPelicula.nombre}</td>
       <td>${nuevaPelicula.precio}</td>
   </tr>`;
   localStorage.setItem("carrito",JSON.stringify(carrito));
}
//---------------------------------------------------

//funcion para el json asi queda el carrito cargado

function actualizarTabla (){
   for (const pelicula of carrito){
      document.getElementById("tabla").innerHTML+=`
      <tr>
      <td>${pelicula.formato}</td>
      <td>${pelicula.nombre}</td>
      <td>${pelicula.precio}</td>
  </tr>`;
   }
}

//---------------------------------------------------



  