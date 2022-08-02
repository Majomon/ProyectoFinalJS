/* Formulario Registro */
let btnRegistrarse = document.querySelector("#btnRegistrarse"),
    btnLogin = document.querySelector("#btnLogin"),
    check = document.querySelector("#check");

const nombre = document.querySelector("#nombre"),
    email = document.querySelector("#email"),
    password = document.querySelector("#password");

btnRegistrarse.innerText = "Registrarse"
btnLogin.innerText = "Ya estas registrado?"

let contenedor = document.querySelector(".contenedor")

/* Formulario Login */
let btnIniciarSesion = document.querySelector("#btnIniciarSesion"),
btnParaRegistrarse = document.querySelector("#btnParaRegistrarse");

const emailUser = document.querySelector("#emailUser"),
passwordUser = document.querySelector("#passwordUser");

btnIniciarSesion.innerText = "Iniciar sesión"
btnParaRegistrarse.innerText = "Aun no tienes cuenta?"

/* Login OFF */
document.querySelector(".cajaLogin").hidden = true;

/* Funcion borrar */
function borrar() {
    contenedor.innerHTML = ""
}

/* Declarando Arrays de objetos */
let clientesSessionStorage = []
let clientesLocalStorage = []


/* Cambiando ventana entre login y registro */


btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".registro").hidden = true;
    document.querySelector(".cajaLogin").hidden = false;
    /* window.location.href = "./login.html"; */
});

btnParaRegistrarse.addEventListener("click", (e) =>{
    e.preventDefault();
    document.querySelector(".registro").hidden = false;
    document.querySelector(".cajaLogin").hidden = true;
})

/* Funciones registro */
function guardar(valor) {
    let user = { uNombre: nombre.value, uEmail: email.value, uPassword: password.value };

    if (user.uNombre == "" || user.uEmail == "" || user.uPassword == "") {
        Swal.fire({
            icon: 'error',
            title: ':C',
            text: 'Complete todos los campos por favor!',
        })
        return;
    } else {
        let { uNombre: nombre, uEmail: email, uPassword=password } = user
        if (valor === "sessionStorage") {
            /* Creando Array de objetos */
            clientesSessionStorage.push(user)
            sessionStorage.setItem("usuario", JSON.stringify(clientesSessionStorage))

            Toastify({

                text: "Gracias por registrarse",

                duration: 5000

            }).showToast();
        }
        if (valor === "localStorage") {
            /* Creando Array de objetos */
            clientesLocalStorage.push(user)
            localStorage.setItem("usuario", JSON.stringify(clientesLocalStorage))
            Toastify({

                text: "Gracias por registrarse",

                duration: 5000

            }).showToast();

        }
    }
}


function recuperoDatos(datos) {
    if (datos) {
        nombre.value = datos.uNombre;
        email.value = datos.uEmail;
        password.value = datos.uPassword;
    }
}

recuperoDatos(JSON.parse(localStorage.getItem("persona")));


btnRegistrarse.addEventListener("click", (event) => {
    console.log(event.target);
    event.preventDefault()
    check.checked ? guardar("localStorage") : guardar("sessionStorage")
});

/* Funciones Login */

function inicioSesion(user) {
    let buscandoUser = user.find((user) => {
        return user.uEmail == emailUser.value && user.uPassword == passwordUser.value;
    });
    buscandoUser
        ? Swal.fire({
            icon: 'success',
            title: ':D',
            text: 'Usuario registrado!'
        })
        
        : Swal.fire({
            icon: 'error',
            title: 'X_X',
            text: 'Usuario no registrado!'
        })
    return buscandoUser;
}
function recuperarLS() {
    let datos = JSON.parse(localStorage.getItem("usuario"));
    return datos;
}


const usuariosLS = recuperarLS();

btnIniciarSesion.addEventListener("click", (e) => {
    e.preventDefault();
    if (inicioSesion(usuariosLS)){
        setTimeout(()=> {
            window.location.href = "productos.html";
        }, 3000)
    }
});
