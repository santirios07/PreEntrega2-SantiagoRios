//DEFINIENDO MIS PRODUCTOS A VENDER
const productos=[
    {
        titulo: "Short Lila",
        categoria: "pantalones",
        precio: 4500,
        img:"./images/shortLila.jpeg",
        id: "S001",
    },
    {
        titulo: "Short Jean",
        categoria: "pantalones",
        precio: 5500,
        img:"./images/shortJean.jpeg",
        id: "S002",
    },
    {
        titulo: "Short Negro",
        categoria: "pantalones",
        precio: 4500,
        img:"./images/shortNegro.jpeg",
        id: "S003",
    },
    {
        titulo: "Vestido Azul",
        categoria: "vestidos",
        precio: 8000,
        img:"./images/vestidoAzul.jpeg",
        id: "V001",
    },
]

//DEFINIENDO ARRAY DEL CARRITO VACIO PARA IR AGREGANDO LOS PRODUCTOS
const carrito=[];

//TRAYENDO DEL HTML
const listaProductos = document.querySelector("#lista-productos");
const listaCarrito = document.querySelector("#lista-carrito");
const carritoIcono = document.querySelector("#carrito-icono");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoTotal = document.querySelector("#carrito-total");
const cerrarCarrito = document.querySelector("#cerrar-carrito");
const continuarCompra = document.querySelector("#continuar-compra");


//MOSTRANDO PRODUCTOS EN HTML
productos.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("py-5");
    div.innerHTML = `
    <div class="bg-gray-100 shadow-md rounded-lg">
        <div class="max-w-sm">            
            <img class="p-6 object-cover w-full" src="${producto.img}" alt="Short Lila">
        </div>
        <div class="px-5 pb-5 items-center">
            <h3 class="text-gray-900 text-xl">${producto.titulo}</h3>
            <div class="flex items-center justify-between py-2">
            <span class="text-2xl font-bold text-gray-900">$${producto.precio}</span>
            <button class="text-white bg-gray-700 hover:bg-gray-800 rounded-lg text-sm px-3 py-2 text-center" id="${producto.id}">Agregar al carrito</button>
            </div>
        </div>
    </div>
    `;
    listaProductos.append(div);

    const botonAgregar = document.querySelector(`#${producto.id}`);

    botonAgregar.addEventListener("click", () =>{
        agregarAlCarrito(producto);
        document.querySelector("#carrito").classList.remove("hidden");
    })
});

//FUNCION QUE ACTUALIZA CARRITO PARA MOSTRAR LA VISUAL
function actualizarCarrito (){
    if (carrito.length === 0){
        carritoVacio.classList.remove("hidden");
        listaCarrito.innerHTML = '';
    } else{
        carritoVacio.classList.add("hidden");
        listaCarrito.innerHTML = '';
        carrito.forEach(producto => {
            //CREANDO PRODUCTO EN EL CARRITO
            const productoCarrito = document.createElement('li');
            productoCarrito.classList.add('flex', 'py-6');
            productoCarrito.innerHTML = `
                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img src="${producto.img}" alt="${producto.titulo}" class="h-full w-full object-cover object-center">
                </div>
                <div class="ml-4 flex flex-1 flex-col">
                    <div>
                        <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                                <a href="#">${producto.titulo}</a>
                            </h3>
                            <p class="ml-4">$${producto.precio * producto.cantidad}</p>
                        </div>
                    </div>
                    <div class="flex flex-1 items-end justify-between text-sm">
                        <p class="text-gray-500">Cant: <span>${producto.cantidad}</span></p>
                        <div class="flex">
                            <button type="button" class="font-medium text-orange-600 hover:text-orange-500" id="borrar-${producto.id}">Borrar</button>
                        </div>
                    </div>
                </div>
            `;
            listaCarrito.append(productoCarrito);

            const borrarCarrito = document.querySelector(`#borrar-${producto.id}`);

            borrarCarrito.addEventListener("click", () =>{
                borrarDelCarrito(producto);
            })
        })
    }
    actualizarTotal();
}


//AGREGAR PRODUCTOS AL CARRITO
function agregarAlCarrito (producto){
    const itemEnCarrito = carrito.find(item => item.id === producto.id);
    itemEnCarrito ? itemEnCarrito.cantidad++ : carrito.push({...producto, cantidad:1});

    actualizarCarrito ();
}

//BORRAR PRODUCTOS DEL CARRITO
function borrarDelCarrito(producto){
    const prodIndex = carrito.findIndex(item => item.id === producto.id);
    carrito.splice(prodIndex, 1);

    actualizarCarrito();
}

function actualizarTotal (){
    const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    carritoTotal.innerText =`$${total}`;
}


//BOTON ESQUINA CERRAR CARRITO
cerrarCarrito.addEventListener("click", () =>{
    document.querySelector("#carrito").classList.add("hidden");
})

//BOTON CONTINUAR COMPRA CARRITO
continuarCompra.addEventListener("click", () =>{
    document.querySelector("#carrito").classList.add("hidden");
})

//ICONO DE CARRITO QUE ABRE EL CARRITO
carritoIcono.addEventListener("click", () =>{
    document.querySelector("#carrito").classList.remove("hidden");
})




/*
do{
    opcionMenu = prompt("Encantados de conocerte " + nombre + "! Porfavor selecciona una opción:\n1. Ver productos \n2. Mostrar carrito \n3. Salir.")

    switch(opcionMenu){
        case "1":
            //MAP QUE CREA ARRAY DE LAS CATEGORIAS DE PRODUCTOS QUE EXISTEN Y LAS FILTRA PARA NO REPETIRLAS
            const listaCategorias = productos.map(producto => producto.categoria).filter((categoria, index, self) => self.indexOf(categoria) === index);
            
            //JOIN AL ARRAY CREADO PARA MOSTRAR EN PANTALLA LA CATEGORIA A SELECCIONAR
            let categoriaIngresada = prompt("Ingrese la categoria de la prenda que quieras comprar:\n -" + listaCategorias.join("\n -").toLocaleUpperCase()).toLowerCase();

            //VERIFICACION DE CATEGORIA INGRESADA
            while(!listaCategorias.includes(categoriaIngresada)) {
                categoriaIngresada = prompt("La categoría ingresada no es válida. Ingrese la categoria de la prenda que quieras comprar:\n -" + listaCategorias.join("\n -").toLocaleUpperCase()).toLowerCase();
            } 
            //FUNCION DE AGREGAR AL CARRITO EL PRODUCTO
            agregarAlCarrito(categoriaIngresada);
            break;
        case "2":
            compraTerminada = mostrarCarrito();
            break;
        case "3":
            alert("Lamentamos que nada te haya gustado. Nos vemos la próxima!")
            break;
        default:
            alert("La opción ingresada no es válida. Por favor, vuelva a elegir una opción");   
    }
}while (opcionMenu !== "3" && !compraTerminada);
*/
//ARMADO DE FUNCION PARA AGREGAR PRODUCTOS
/*
function agregarAlCarrito(categoria){
    //FILTRAR LOS PRODUCTOS DE LA CATEGORIA INGRESADA
    const categoriaProducto = productos.filter(productos => productos.categoria === categoria);

    //IR AÑADIENDO PRODUCTO AL MENSAJE POR LA CATEGORIA INGRESADA
    let mensaje = "Elegiste la categoria " + categoria.toUpperCase() + ". Por favor, selecciona el producto que quieras añadir al carrito:\n";
    categoriaProducto.forEach(producto => {
        mensaje += "-" + producto.producto.toUpperCase() + ": $" + producto.precio + "\n";
    })

    let productoCorrecto = false;

    while(!productoCorrecto){
        //PROMPT CON MENSAJE E INGRESO DE PRODUCTO A AÑADIR AL CARRITO
        let productoIngresado = prompt(mensaje).toLowerCase()
    
        //VERIFICAR SI EL PRODUCTO SELECCIONADO ES CORRECTO
        productoCorrecto = categoriaProducto.find(producto => producto.producto === productoIngresado)
        
        if(!productoCorrecto){
            alert("El producto seleccionado no es correcto.")
        }else{
            alert("Excelente, agregaste (1) " + productoIngresado.toUpperCase() + " a tu carrito!");
            
            //PUSHEAR PRODUCTO AL ARRAY DEL CARRITO
            carrito.push(productoCorrecto);
        }
    }
}
*/
//FUNCION PARA MOSTRAR EL CARRITO CON CADA PRODUCTO Y SU TOTAL
/*
function mostrarCarrito(){
    //CALCULAR EL PRECIO TOTAL DEL CARRITO
    let precioTotal = carrito.reduce((acc,producto)=> acc + producto.precio, 0);

    //MOSTRAR CADA PRODUCTO EN EL CARRITO
    let mensajeCarrito = "Excelente " + nombre.toUpperCase() + "! Estos son los productos que seleccionaste para comprar.\n";
    carrito.forEach(producto => {
        mensajeCarrito += "-" + producto.producto.toUpperCase() + ": $" + producto.precio + "\n";
    })

    //PROMPT PARA DECIDIR SI CONTINUA COMPRANDO O FINALIZA LA COMPRA
    let opcionCarrito
    do{
        opcionCarrito = prompt(mensajeCarrito + "\nTotal carrito: $" + precioTotal + ". \n\nSelecciona una opción:\n1. Ir a pagar\n2. Seguir comprando")
        switch(opcionCarrito){
            case "1":
                //SI ELIGE IR A PAGAR SE EJECUTA LA FUNCION DEL METODO DE PAGO
                calcularTotalFinal(precioTotal);
                compraTerminada = true;
                break;
            case "2":
                break;
            default:
                alert("La opción ingresada no es válida. Por favor, vuelva a elegir una opción");
        }
    }
    while(opcionCarrito != 2 && opcionCarrito != 1)
    
    return compraTerminada;
}
*/

//FUNCION CALCULO DE TOTAL FINAL
/*
function calcularTotalFinal(total){
    //PROMPT PARA SELECCIONAR METODO DE PAGO
    let metodoPago = prompt("Tu total es $" + total + ". Ahora selecciona el metodo de pago con el que quieres realizar tu compra.\n Efectivo: 15% de descuento.\n Debito: sin recargo.\n Credito: \n -3 cuotas con un 10% de interes\n -6 cuotas con 25% de interés.").toLowerCase();



    //CICLO SI SE INGRESA MAL EL METODO
    while(metodoPago !=="efectivo" && metodoPago !=="debito" && metodoPago !=="credito"){
        metodoPago = prompt("El método de pago no es correcto. Por favor selecciona como quieres realizar la compra. Efectivo: 15% de descuento. Debito: sin recargo. Credito: en 3 cuotas con un 10% de interes o 6 cuotas con 25% de interés.").toLowerCase();
    };

    //INTERES O DESCUENTO SEGUN METODO DE PAGO

    let interes;
        
    if (metodoPago === "efectivo") {
        interes = 0.85;
    } else if (metodoPago === "debito") {
        interes = 1.00;
    } else if (metodoPago === "credito") {
        let cuotas = Number(prompt("Ingrese la cantidad de cuotas, 3 o 6:"));
        //CICLO DE VERIFICACION DE CUOTAS
        while(cuotas !==3 && cuotas !==6){
            cuotas = Number(prompt("La cantidad de cuotas ingresadas no es correcta volver a ingresar. Ingrese la cantidad de cuotas, 3 o 6:"));
        }
        //VALOR INTERES POR CUOTA
        if(cuotas === 3){
            interes = 1.10;
        }else if (cuotas === 6){    
            interes = 1.25;
        }
    }

    alert("Has seleccionado el método de pago: " + metodoPago.toUpperCase() +".\nEl total de tu compra es de: $" + Number(total*interes).toFixed(2) + "\nGracias por confiar en nosotros!\n");
}
*/