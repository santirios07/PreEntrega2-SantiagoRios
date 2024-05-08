//IMPORTANDO CARRITO DESDE LOCAL STORAGE
const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));

//TRAYENDO DE HTML
const listadoCheckout = document.querySelector("#listado-checkout");
const totalCheckout = document.querySelector("#total-checkout");
const iconoCantidad = document.querySelector("#icono-cantidad");
const botonCancelar = document.querySelector("#boton-cancelar");


//MOSTRAR PRODUCTOS EN LISTADO
carritoGuardado.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("grid", "sm:grid-cols-2", "items-start", "gap-6")
    div.innerHTML = `
        <div class="px-1 py-1 shrink-0 bg-gray-50 rounded-md">
            <img src='${producto.img}' class="w-full object-contain object-center" />
        </div>
        <div class="divide-y divide-gray-200">
            <h3 class="text-xl text-white">${producto.titulo}</h3>
            <ul class="text-sm text-white space-y-3 py-2 mt-2">
                <li class="flex flex-wrap gap-4">Precio Unitario<span class="ml-auto">$${producto.precio}</span></li>
                <li class="flex flex-wrap gap-4">Cantidad<span class="ml-auto">${producto.cantidad}</span></li>
                <li class="flex flex-wrap gap-4">Precio Total<span class="ml-auto">$${producto.precio * producto.cantidad}</span></li>
            </ul>
        </div>
    `

    listadoCheckout.append(div);
    actualizarHeader();
    actualizarTotal();
});

function actualizarTotal (){
    const total = carritoGuardado.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalCheckout.innerText =`$${total}`;

    return total;
}

function actualizarHeader (){
    const cantidadProductos = carritoGuardado.reduce((acc, producto) => acc + producto.cantidad, 0);
    iconoCantidad.innerText = cantidadProductos;
}


//EVENTO BOTON CANCELAR
botonCancelar.addEventListener("click", () => {
    alertaCancelar();
})


//FUNCION PARA VOLVER ATRAS AL CANCELAR COMPRA
function alertaCancelar(){
    Swal.fire({
        icon: "question",
        title: "¿Está seguro que desea cancelar la compra?",
        showCancelButton: true,
        confirmButtonText: "Si, estoy seguro",
        confirmButtonColor: "#FF9700",
        cancelButtonText: "Volver"
      }).then((result) => {
        if (result.isConfirmed) {
            location.href = "/index.html#productos"
        }
      });
}




// EVENTO PARA EL FORMULARIO DE COMPRA
const botonCompletarCompra = document.querySelector('#boton-completar-compra');
botonCompletarCompra.addEventListener("click", (event) => {

    // TOMANDO VALORES DEL FORMULARIO
    const nombre = document.querySelector('input[name="nombre"]').value.trim();
    const apellido = document.querySelector('input[name="apellido"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const telefono = document.querySelector('input[name="telefono"]').value.trim();
    const calleNumero = document.querySelector('input[name="calleNumero"]').value.trim();
    const ciudad = document.querySelector('input[name="ciudad"]').value.trim();
    const provincia = document.querySelector('input[name="provincia"]').value.trim();
    const codigoPostal = document.querySelector('input[name="codigoPostal"]').value.trim();
    
    // MOSTRANDO DETALLES DE COMPRA EN HTML
    const detallesCompra = document.querySelector('#detalles-compra');
    detallesCompra.innerHTML = `
        <h2><strong>Compra realizada! Tus datos son:<h2/>
        <p><strong>Nombre:</strong> ${nombre} ${apellido}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Dirección:</strong> ${calleNumero}, ${ciudad}, ${provincia}, ${codigoPostal}</p>
    `;

    //ALERTA DE CONFIRMACION
    Swal.fire({
        title: `¡Gracias por tu compra ${nombre}!`,
        text: `Se han enviado los detalles de pago al correo electrónico: ${email}. ¡Esperamos que disfrutes de tu compra!`,
        description:`Total: ${actualizarTotal()}`,
        showCloseButton: true,
        icon: 'success',
        confirmButtonText: 'Entendido',
        
    }).then((result) => {
        if (result.isConfirmed) {
            //BORRO CARRITO AL TERMINAR COMPRA
            localStorage.removeItem('carrito');

            //REDIRECCIONO AL INICIO
            location.href = "/index.html"
        }
      });
    
    //PARA QUE EL FORMULARIO NO SE ENVIE AUTOMATICAMENTE  
    event.preventDefault();
});

