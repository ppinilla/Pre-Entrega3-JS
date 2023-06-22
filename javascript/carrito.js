
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito) || [];

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito(productos){
    //console.log(productos);
    //console.log("EN LA FUNCION");

    if (productos.length > 0){
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = ""; 

        productos.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <div class="carrito-producto-titulo"> 
            <small>Titulo</small> 
            <h3>${producto.nombre}</h3>
            </div>
            <div class="carrito-producto-cantidad">
            <small>Cantidad</small>
            <p>${producto.cantidad}</p>
            </div>
            <div class="carrito-producto-precio">
            <small>Precio</small>
            <p>$${producto.precio}</p>
            </div>
            <div class="carrito-producto-subtotal">
            <small>Subtotal</small>
            <p>$${producto.precio*producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar"
            id="${producto.id}"
            >Eliminar
            </button>
            `;

            contenedorCarritoProductos.appendChild(div);
        })    

    actualizarBotonesEliminar();
    actualizarTotal();

    }else{
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
}

cargarProductosCarrito(productosEnCarrito);

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
  
    botonesEliminar.forEach((boton) => {
      boton.addEventListener("click", eliminarDelCarrito);
    });
  }

function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex (
        (producto) => producto.id == idBoton
        );

    /* productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); */

    if(index !== -1){
        productosEnCarrito.splice(index,1);
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito(productosEnCarrito);
    }
}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito(){
    Swal.fire({
        title: 'Estas seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce(
            (acc, producto) => acc + producto.cantidad, 0
            )} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito = [];
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito(productosEnCarrito);
        }
    });
}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce(
        (acc, producto) => acc + (producto.precio * producto.cantidad), 
    0
    );
    contenedorTotal.innerHTML = `$${totalCalculado.toFixed(2)}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){
    productosEnCarrito = [];
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}