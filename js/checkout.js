//IMPORTANDO CARRITO DESDE LOCAL STORAGE
const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));

//TRAYENDO DE HTML
const listadoCheckout = document.querySelector("#listado-checkout");
const totalCheckout = document.querySelector("#total-checkout");
const iconoCantidad = document.querySelector("#icono-cantidad");


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
}

function actualizarHeader (){
    const cantidadProductos = carritoGuardado.reduce((acc, producto) => acc + producto.cantidad, 0);
    iconoCantidad.innerText = cantidadProductos;
}



