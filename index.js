//variables
//botones
let ingresar = document.getElementById("ingresar");
let mostrarPlatos = document.getElementById("mostrar");
let ordenarPrecio = document.getElementById("ordenarPrecio");
let ordenarProducto = document.getElementById("ordenarProducto");
let filtrarPlato = document.getElementById("filtrarPlato");
let filtrarPais = document.getElementById("filtrarPais");
const resetear = document.querySelector("#resetear");

let nuevoPlato = [];
let platoJson = [];

const elemento = document.querySelector("#tabla");
let listaPlatos = document.getElementById("tabla");

let tablaContent = ``;
let tablaContentPrecio= ``;
let tablaContentProducto= ``;
let tablaContentFiltroPais= ``;
let tablaContentFiltroPlato= ``;

let ordenadosPrecio=[];
let ordenadosProducto=[];



class comidas {
  constructor(nombre, ingredientes, pais, precio) {
    this.nombre = nombre;
    this.ingredientes = ingredientes;
    this.pais = pais;
    this.precio = precio;
  }
}

//funcionalidad de los botones
ingresar.onclick = function (e) {
  ingreso();
};
mostrarPlatos.onclick = function (e) {
  mostrarPlato();
};
ordenarPrecio.onclick = function (e) {
  ordenPrecio();
};
ordenarProducto.onclick = function (e) {
  ordenProducto();
};
filtrarPlato.onclick = function (e) {
  filtradoPlato();
};
filtrarPais.onclick = function (e) {
  filtradoPais();
};
resetear.addEventListener("click", () => {
  reset();

}
);

//funciones
function ingreso() {
  
  let nombre = document.getElementById("formNombre").value;  
  let ingredientes = document.getElementById("formIngredientes").value;  
  let pais = document.getElementById("formPais").value;  
  let precio = document.getElementById("formPrecio").value;  

  nuevoPlato.push(new comidas(nombre, ingredientes, pais, precio));
//guardado del plato en el localStorage.
  localStorage.setItem("plato",JSON.stringify(nuevoPlato));

  platoJson = JSON.parse(localStorage.getItem("plato"));

  document.getElementById("formNombre").value="";
  document.getElementById("formIngredientes").value="";
  document.getElementById("formPais").value="";
  document.getElementById("formPrecio").value="";

}

function mostrarPlato() {
  reset();

  for (let item of platoJson) {
    tablaContent += `
      <tr>
        <td>${item.nombre}</td>
        <td>${item.pais}</td>
        <td>${item.precio}</td>
        <td>${item.ingredientes}</td>
      </td>
    `;
  }
  listaPlatos.innerHTML += tablaContent;
}

function ordenPrecio() {
  reset();

  ordenadosPrecio= platoJson.map(elemento =>elemento);
  ordenadosPrecio.sort(function(a,b){
    return a.precio-b.precio;
  })

  for (let item1 of ordenadosPrecio ) {
    tablaContentPrecio += `
      <tr>
        <td>${item1.nombre}</td>
        <td>${item1.ingredientes}</td>
        <td>${item1.pais}</td>
        <td>${item1.precio}</td>
      </td>
    `;
  }
  listaPlatos.innerHTML += tablaContentPrecio;
}

function ordenProducto() {
  reset();
  ordenadosProducto= platoJson.map(elemento =>elemento);
 ordenadosProducto.sort(function(a,b){
    if (a.nombre > b.nombre) {
      return 1;
      }
      if (a.nombre < b.nombre) {
      return -1;
      }
      return 0;
  })

  for (let item1 of ordenadosProducto ) {
    tablaContentProducto += `
      <tr>
        <td>${item1.nombre}</td>
        <td>${item1.ingredientes}</td>
        <td>${item1.pais}</td>
        <td>${item1.precio}</td>
      </td>
    `;
  }
  listaPlatos.innerHTML += tablaContentProducto;
}

function filtradoPlato(){
 reset();
 let platoF = prompt("ingrese el nombre del plato que quiere buscar");
let platoFiltrado = platoJson.filter(plato => plato.nombre==platoF);

for (let plato of platoFiltrado ) {
  tablaContentFiltroPlato += `
    <tr>
      <td>${plato.nombre}</td>
      <td>${plato.ingredientes}</td>
      <td>${plato.pais}</td>
      <td>${plato.precio}</td>
    </td>
  `;
}
listaPlatos.innerHTML += tablaContentFiltroPlato;

};

function filtradoPais(){
  reset();
  let platoA = prompt("ingrese el pais de origen del plato que quiere buscar");
 let paisFiltrado = platoJson.filter(plato => plato.pais==platoA);
 
 for (let plato of paisFiltrado ) {
   tablaContentFiltroPais += `
     <tr>
       <td>${plato.nombre}</td>
       <td>${plato.ingredientes}</td>
       <td>${plato.pais}</td>
       <td>${plato.precio}</td>
     </td>
   `;
 }
 listaPlatos.innerHTML += tablaContentFiltroPais;
 
 };
 

function reset() {
  elemento.innerHTML = `<table id="tabla" class="w-75 m-5 table table-bordered table-striped table-dark">
  <tr>
      <th>Plato</th>
      <th>ingredientes</th>
      <th>pais de origen</th>
      <th>Precio</th>
  </tr>
</table>`;   

tablaContent = ``;
tablaContentPrecio =``;
tablaContentProducto =``;
tablaContentFiltroPais =``;
tablaContentFiltroPlato =``;
}








