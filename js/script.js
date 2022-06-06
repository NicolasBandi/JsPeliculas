console.log ("Librerias, road to proyecto final- Nicolas Pablo Ivan Pedicino")

//---------------------------------------------------


console.table(peliculas)

let carrito=[]
let filtroPeliculas=[]

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

//Filtro
const busqueda = document.querySelector('#buscar');
const resultado = document.querySelector('.peliculas');
console.log(resultado);


const filtrar = ()=>{
   resultado.innerHTML=''

   const texto = busqueda.value.toLowerCase();
   filtroPeliculas=[]
   for (let pelicula of peliculas) {
     let card = document.createElement("div");
     let nombre = pelicula.nombre.toLowerCase();
     if (nombre.indexOf(texto) !== -1){
      filtroPeliculas.push(pelicula)
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
         resultado.append(card);
    
  };
} 
console.log (filtroPeliculas)
    filtroPeliculas.forEach(pelicula => {
    document.getElementById(`btn${pelicula.id}`).addEventListener('click', function() {
    console.log ()
    agregarAlCarrito(pelicula);
   });
 });
}
 busqueda.addEventListener('keyup', filtrar);

//---------------------------------------------------

 //agregar al carrito

function agregarAlCarrito(nuevaPelicula) {
   carrito.push(nuevaPelicula);
   console.log(carrito);
   Swal.fire(
      "Producto: "+nuevaPelicula.nombre,
      "agregado al carrito",
      "success"
    );
   document.getElementById("tabla").innerHTML+=`
   <tr>
       <td>${nuevaPelicula.formato}</td>
       <td>${nuevaPelicula.nombre}</td>
       <td>${nuevaPelicula.precio}</td>
   </tr>`;
   localStorage.setItem("carrito",JSON.stringify(carrito));
}



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


//-botones del carrito
let finalizar=document.getElementById("finalizar");
finalizar.onclick=()=>{
    Swal.fire({
      title: 'Pedido confirmado !',
      text: 'Será preparado a la brevedad',
    })
    eliminarFila()
    
}

let borrarCarrito =document.getElementById("borrarCarrito");
borrarCarrito.onclick=()=>{
   eliminarFila()
    Swal.fire({
        title: 'Se Ha vaciado el carrito de compras!',
    });
   }
   
function eliminarFila(){
   tabla.innerHTML=""
   carrito= []
   localStorage.setItem("carrito",JSON.stringify(carrito))
   

}
  