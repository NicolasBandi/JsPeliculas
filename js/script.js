console.log ("Librerias, road to proyecto final- Nicolas Pablo Ivan Pedicino")

//---------------------------------------------------
console.table(peliculas)

let carrito=[]
let filtroPeliculas=[]
let productosJSON = [];

if(localStorage.getItem("carrito")!=null){
   carrito=JSON.parse(localStorage.getItem("carrito"));
   actualizarTabla()
}else{
   carrito=[]
}
imprimirProductosEnHTML(peliculas);

function imprimirProductosEnHTML() {
console.log(productosJSON)
  let contenedor = document.getElementById("contenedor");

  for (const pelicula of productosJSON) {
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
  for (const pelicula of productosJSON) {
    document.getElementById(`btn${pelicula.id}`).addEventListener('click', function() {
       agregarAlCarrito(pelicula);
     });
   };

}

class Pelicula{
    constructor(pelicula) {
        this.id = pelicula.id;
        this.nombre = pelicula.nombre;
        this.formato= pelicula.formato;
        this.precio = pelicula.precio;
        this.imagen =pelicula.imagen
        this.cantidad = 1;
    }
}
//---------------------------------------------------

 //agregar al carrito

 function agregarAlCarrito(nuevaPelicula) {
    let encontrado = carrito.find(p => p.id == nuevaPelicula.id);
    console.log(encontrado);
    if (encontrado == undefined) {
     let peliculaCarrito= new Pelicula (nuevaPelicula);
   carrito.push(peliculaCarrito);
   console.log(carrito);
   Swal.fire(
      "Pelicula: "+nuevaPelicula.nombre,
      "Se agrego al carrito",
      "success"
    );
   document.getElementById("tabla").innerHTML+=`
   <tr>
       <td>${peliculaCarrito.formato}</td>
       <td>${peliculaCarrito.nombre}</td>
       <td>${peliculaCarrito.precio}</td>
   </tr>`;
   localStorage.setItem("carrito",JSON.stringify(carrito));

}else {
    //pido al carro la posicion del producto 
    let posicion = carrito.findIndex(p => p.id == nuevaPelicula.id);
    carrito[posicion].cantidad += 1;
    document.getElementById(nuevaPelicula.id).innerHTML=carrito[posicion].cantidad;
}
document.querySelector("#precioTotal").innerText=(`Total: $ ${calcularTotal()}`);
}

function calcularTotal() {
    let suma = 0;
    for (const pelicula of carrito) {
        suma = suma + (pelicula.precio * pelicula.cantidad);
    }
    return suma;
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
    }document.querySelector("#precioTotal").innerText=(`Total: $ ${calcularTotal()}`);
 }

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
   document.querySelector("#precioTotal").innerText=(`Total: $ ${calcularTotal()}`);

}

//GETJSON de productos.json

document.addEventListener(`DOMContentLoaded`, ()  =>{
    fechtData()
    console.log(fechtData)
})

const fechtData= async ()=>{
 try {
    const URLJSON="/objetos.json"
    const resp=await fetch("objetos.json")
    const data= await resp.json()
    productosJSON = data;
    imprimirProductosEnHTML();
 }catch (error){
    console.log(error)
}
}