/* Botones del carrito */
const btnCarrito = document.querySelector(".btnCarrito")
const carritoCerrar = document.getElementById('carritoCerrar');

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]
const finalizComprar = document.getElementsByClassName('finalizarCompra')

btnCarrito.addEventListener("click", () => {
    contenedorModal.classList.toggle('modal-active')
});

carritoCerrar.addEventListener('click', () => {
    contenedorModal.classList.toggle('modal-active')
})
modalCarrito.addEventListener('click', (e) => {
    e.stopPropagation()
})
contenedorModal.addEventListener('click', () => {
    carritoCerrar.click()
})

//Cargando productos
const listaPost = document.querySelector("#post");
const carrito = []
const carritoContenedor = document.querySelector("#carrito-contenedor")



function limpiar() {
    carritoContenedor.innerHTML = ""
}




fetch("./js/stock.json")
    .then((response) => response.json())
    .then((stock) => {

        /* Local Storage */
        document.addEventListener(`DOMContentLoaded`, () => {
            if (localStorage.getItem(`carrito`))
                carrito = JSON.parse(localStorage.getItem(`carrito`))
            actualizarCarrito();
        })



        /* Creando Cards */
        stock.forEach(stock => {
            const li = document.createElement("li");
            li.innerHTML = `<div class="card" style="width: 18rem;">
                                <img src="${stock.img}" class="card-img-top" alt="">
                                <div class="card-body">
                                    <h5 class="card-title">${stock.nombre}</h5>
                                    <p>Precio: $ <span  class="card-precio">${stock.precio}</span></p>
                                 <button id="agregar${stock.id}"class="boton-agregar btn btn-primary">Agregar al carrito</button>
                                </div>
                            </div>`;

            listaPost.append(li);

            localStorage.setItem(`carrito`, JSON.stringify(carrito))


            const btnAgregar = document.getElementById(`agregar${stock.id}`)

            btnAgregar.addEventListener('click', () => {
                agregarAlCarrito(stock.id);
            })


        });

        /* Agregando items al modal-carrito */
        const agregarAlCarrito = (prodId) => {
            let yaExiste = carrito.find((prod) => prod.id === prodId)
            if (yaExiste) {
                yaExiste.cantidad = yaExiste.cantidad + 1
                document.getElementById(`cantidad${yaExiste.id}`).innerHTML = `<p id="cantidad${yaExiste.id}">Cantidad: ${yaExiste.cantidad}</p>`
                actualizarPrecio();
            } else {
                const item = stock.find((prod) => prod.id === prodId)
                item.cantidad = 1
                carrito.push(item)
                actualizarCarrito();
                actualizarPrecio();
            }
        }

        const eliminarDelCarrito = (prodId) => {
            const item = carrito.find((prod) => prod.id === prodId)
            const indice = carrito.indexOf(item)
            carrito.splice(indice, 1)
            actualizarCarrito();
            actualizarPrecio();
        }

        const actualizarCarrito = () => {
            limpiar()
            carrito.forEach((prod) => {
                let div = document.createElement("div");
                div.classList.add('productoEnCarrito')
                div.innerHTML = `<p>${prod.nombre}</p>
                               <p>Precio: $${prod.precio}</p>
                               <p id="cantidad${prod.id}">Cantidad: ${prod.cantidad}</p>
                               <button id="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                            `
                carritoContenedor.appendChild(div)

                /* Botones de eliminar en modal */
                const btnEliminarDeAUnoCarrito = document.getElementById(`eliminarDelCarrito(${prod.id})`)

                btnEliminarDeAUnoCarrito.addEventListener(`click`, () => {
                    eliminarDelCarrito()
                })
            })
        }
  

        const actualizarPrecio = () => {
            const precioTotal = document.querySelector("#precioTotal")
            precioTotal.innerText = carrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
        }

    });







