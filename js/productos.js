//Cargando productos
const listaPost = document.querySelector("#post");
const carrito = []
const contenedorCarrito = document.querySelector(".carrito-contenedor")

fetch("./js/stock.json")
    .then((response) => response.json())
    .then((stock) => {
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

            const btnAgregar = document.getElementById(`agregar${stock.id}`)

            btnAgregar.addEventListener('click', () => {
                agregarCarrito(stock.id);
            })




        });
/*             const actualizarCarrito = () => {
                carrito.forEach((prod) => {
                    const div = document.createElement("div");
                    div.className = "productoEnCarrito"
                    div.innerHTML = `
                                    <p>${prod.nombre}</p>
                                    <p>Precio: ${prod.precio}</p>
                                    <button onclick= "eliminarDelCarrito(${prod.id})" class="boton-eliminar">X</button>
                                    `
                    contenedorCarrito.append(div)
            })
            
        } */

        console.log(carrito);

        const agregarCarrito = (prodId) => {
            const item = stock.find((prod) => prod.id === prodId)
            carrito.push(item)
        }


    });

/* Botones del carrito */
const btnCarrito = document.querySelector(".btnCarrito")
const carritoCerrar = document.getElementById('carritoCerrar');

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


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





