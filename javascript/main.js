let productos = [];

fetch("./javascript/productos.json")
.then(response => response.json())
.then(data => {
    productos = data;
    renderizarProductos(productos);
    });

const contenedor = document.querySelector("#misprods");
const buttonCategory = document.querySelector(".buttonCategory");
const mainTitle = document.querySelector("#main-title");
let botonesAgregar = document.querySelectorAll(".prodAAgregar");
const number = document.querySelector("#number");

//Cargar productos
function renderizarProductos(productosElegidos) {

    contenedor.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img id="cardimg" src=${producto.foto} class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">${producto.precio}</p>
        <button class="btn btn-primary prodAAgregar" id="${producto.id}">Agregar</button>
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
function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".prodAAgregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", () => agregarAlCarrito());
    });
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumber();
}else{
    productosEnCarrito = [];
}

function agregarAlCarrito(e){
    const idOption = e.currentTarget.id;
    const prodAgregado = productos.find(producto => producto.id === idOption);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idOption);
        productosEnCarrito[index].cantidad++;
    }else{
        prodAgregado.cantidad = 1;
        productosEnCarrito.push(prodAgregado);
    }

    actualizarNumber();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumber(){
    let nuevoNumber = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    number.innerHTML = nuevoNumber;
}