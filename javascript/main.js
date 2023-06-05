

let productos = [];

let usuario;
let usuarioStorage = sessionStorage.getItem("usuario");

if(usuarioStorage){
    usuario = usuarioStorage;
    alert(`Bienvenid@ ${usuario} nuevamente`);
}else{
    usuario = prompt("Ingrese el usuario");
    alert(`Bienvenid@ usuario eres nuevo`);
    localStorage.setItem("usuario", usuario);

}

let nav = document.getElementById("nav");
let divNav = document.createElement("div");

divNav.innerHTML=`
<div class="container d-flex flex-wrap">
          <ul class="nav me-auto">
            <li class="nav-item"><a href="#" class="nav-link link-dark px-2 active" aria-current="page">Inicio</a></li>
            <li class="nav-item"><a href="#" class="nav-link link-dark px-2">Productos</a></li>
            <li class="nav-item"><a href="#" class="nav-link link-dark px-2">Como comprar</a></li>
            <li class="nav-item"><a href="#" class="nav-link link-dark px-2">Contactos</a></li>
            <li class="nav-item"><a href="./carrito.html" class="nav-link link-dark px-2">Carrito<span class="number"></span></a></li>
          </ul>
          <ul class="nav">
            <li class="nav-item"><a href="#" class="nav-link link-dark px-2">Iniciar sesion</a></li>
            <li class="nav-item"><a href="#" class="nav-link link-dark px-2">Crear cuenta</a></li>
          </ul>
        </div>`

nav.append(divNav);

let header = document.getElementById("header");
let divHeader = document.createElement("div");

divHeader.innerHTML=`
<div class="container d-flex flex-wrap justify-content-center">
          <a href="/" class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
            <div class="logo"><img src="/img/Logo Bendita.png" alt="Logo Bendita" width="60px" ></div>
          </a>
          <form class="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
            <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
          </form>
        </div>`
header.append(divHeader);

const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

fetch("./javascript/productos.json")
.then(response => response.json())
.then(data => {
    productos = data;
    renderizarProductos(productos);
    });

/* localStorage.setItem("carrito", JSON.stringify(productos));

let botonEliminar = document.getElementById("eliminar");
let carrito = [];
let carritoStorage = localStorage.getItem("carrito");

if(carritoStorage){
    carrito = JSON.parse(carritoStorage);
}else{
    let div = document.createElement("div");
    div.innerHTML = "El carrito esta vacio";
    document.body.append(div);
}

const respuesta = () => {
    alert("Producto agregado al carrito");
}

boton.addEventListener("click", respuesta);
boton.addEventListener("click", () => {
    localStorage.clear();
}) */

const contenedor = document.querySelector("#misprods");
const buttonCategory = document.querySelectorAll(".button-category");
const mainTitle = document.querySelector("#main-title");
let botonesAgregar = document.querySelectorAll(".prodAAgregar");
const number = document.querySelector(".number");

//Cargar productos
function renderizarProductos(productosElegidos) {

    contenedor.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img width="101" height="auto" id="cardimg" src="${producto.foto}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">${producto.precio}</p>
        <button class="btn btn-primary prodAAgregar" id="${producto.id} boton">Agregar</button>
        </div>
        `;
        contenedor.appendChild(div);
    });
    actualizarBotonesAgregar(productosElegidos);
}

//Categoria Productos

buttonCategory.forEach(button =>
    button.addEventListener("click", (e) => {

        buttonCategory.forEach(button => button.classList.remove("active"));
        e.currentTarget.classList.add("active");

        const productosOption = productos.filter(producto => producto.categoria.id === e.currentTarget.id);

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            mainTitle.innerHTML = productoCategoria.categoria.nombre;

            const productosOption = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            renderizarProductos(productosOption)
        }else{
            mainTitle.innerHTML = "Todos los Productos"
            renderizarProductos(productos)
        };
    })
);

//Botones Agregar
function actualizarBotonesAgregar(productos){
    botonesAgregar = document.querySelectorAll(".prodAAgregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", (e) => agregarAlCarrito(e, productos));
    });
}


function agregarAlCarrito(e, productos){
    console.log('EN AGREGAR AL CARRITO');
    console.log(productos);
    const idOption = e.currentTarget.id;
    const prodAgregado = productos.find(producto => producto.id === idOption);

    const prodAlCarrito = {
        ...prodAgregado,
        cantidad:1,

    }

    const existe = productosEnCarrito.some(producto => producto.id === idOption);
    if(existe) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idOption);
        productosEnCarrito[index].cantidad++;
    }else{
        productosEnCarrito.push(prodAlCarrito);
    }

    actualizarNumber();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumber(){
    let nuevoNumber = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    number.innerHTML = nuevoNumber;
}

let footer = document.getElementById("footer");
let section = document.createElement("section");

section.innerHTML= `
<footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div class="col-md-4 d-flex align-items-center">
        <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
            <div class="logo"><img src="/img/Logo Bendita.png" alt="Logo Bendita" width="60px" ></div>
        </a>
        <span class="mb-3 mb-md-0 text-body-secondary">© 2023 Company, Inc</span>
      </div>
      
      
  
      <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li class="ms-3"><a class="text-body-secondary" href="#" ><i class="bi bi-instagram"></i></a></li>
        <li class="ms-3"><a class="text-body-secondary" href="#"><i class="bi bi-facebook"></i></a></li>
        <li class="ms-3"><a class="text-body-secondary" href="#"><i class="bi bi-whatsapp"></i></a></li>
      </ul>
    </footer>`
footer.append(section);