//ALGORITMO PARA DETECTAR PRODUCTO EN LA LISTA
//SELECCIONAR METODO DE PAGO Y CALCULAR PRECIO FINAL SEGUN INTERES
//SE AGREGA CARRITO Y ARRAY DE PRODUCTOS CON SUS VARIANTES


//PROMPT QUE PIDE EL NOMBRE DEL CLIENTE
let nombre = prompt("Hola! Bienvenido a Mar Indumentaria. Por favor ingrese su nombre para continuar.").toUpperCase();

//DEFINIENDO ARRAY DEL CARRITO VACIO PARA IR AGREGANDO LOS PRODUCTOS
const carrito=[];

//DEFINIENDO MIS PRODUCTOS A VENDER
// DIFERENTES TIPOS DE PANTALONES, REMERAS Y VESTIDOS
const productos=[
    {
        producto: "short",
        categoria: "pantalones",
        precio: 4500,
    },
    {
        producto: "jean",
        categoria: "pantalones",
        precio: 7500,
    },
    {
        producto: "cargo",
        categoria: "pantalones",
        precio: 6000,
    },
    {
        producto: "remera",
        categoria: "remeras",
        precio: 5700,
    },
    {
        producto: "musculosa",
        categoria: "remeras",
        precio: 4500,
    },
    {
        producto: "chomba",
        categoria: "remeras",
        precio: 7100,
    },
    {
        producto: "vestidocorto",
        categoria: "vestidos",
        precio: 8000,
    },
    {
        producto: "vestidolargo",
        categoria: "vestidos",
        precio: 9300,
    },
]

//MENU PARA SELECCIONAR OPCIONES
let opcionMenu;
do{
    opcionMenu = prompt("Encantados de conocerte " + nombre + "! Porfavor selecciona una opción:\n1. Ver productos \n2. Mostrar carrito \n3. Salir.")

    switch(opcionMenu){
        case "1":
            //MAP QUE CREA ARRAY DE LAS CATEGORIAS DE PRODUCTOS QUE EXISTEN
            const listaCategorias = [...new Set(productos.map((producto) => producto.categoria))];

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
            mostrarCarrito();
            break;
        case "3":
            alert("Lamentamos que nada te haya gustado. Nos vemos la próxima!")
            break;
        default:
            alert("La opción ingresada no es válida. Por favor, vuelva a elegir una opción");    
    }
}while (opcionMenu !== "3");

//ARMADO DE FUNCION PARA AGREGAR PRODUCTOS
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
            carrito.push(productoIngresado);  
            console.log(carrito)
        }
    }
    //
}






//FUNCION CALCULO DE TOTAL FINAL
function calcularTotalFinal(total){
    /*!
    //!COMENTANDO PARTE DE PRECIO Y PRODUCTOS PARA ARMAR CARRITO APARTE
    //DECLARANDO LA VARIABLE PRECIO
    let precio;

    //PROMPT PARA SELECCIONAR PRODUCTO
    let producto = prompt("Encantados de conocerte " + nombre + "!" + " Estos son nuestros productos! Elije aquel que quieras comprar: Pantalon $9.000. Vestido $6.500. Remera $4.300. ").toLowerCase();

    //CONDICIONAL SEGUN PRODUCTO INGRESADO EL PRECIO QUE TENDRA
    if(producto === "pantalon"){
        precio = 9000;
    } else if(producto === "vestido"){
        precio = 6500;
    } else if(producto === "remera"){
        precio = 4300;
    }else{
        //CICLO SI SE INGRESA MAL LE PRODUCTO
        while(producto !=="pantalon" && producto !=="vestido" && producto !=="remera"){
            producto = prompt("El producto ingresado no es correcto. Elije aquel que quieras comprar: Pantalon $9.000. Vestido $6.500. Remera $4.300.").toLowerCase();
        };
    }
    */

    //PROMPT PARA SELECCIONAR METODO DE PAGO
    let metodoPago = prompt("Perfecto! Has seleccionado tu " + producto + ". Ahora selecciona el metodo de pago con el que quieres realizar tu compra. Efectivo: 15% de descuento. Debito: sin recargo. Credito: en 3 cuotas con un 10% de interes o 6 cuotas con 25% de interés.").toLowerCase();



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

    return Number(total*interes);
}

//EJECUTANDO LA FUNCION
//calcularTotalFinal(totalCompra);

//ALERTA CON EL MONTO FINAL DE LA COMPRA
//alert("Tu compra fue realizada, el costo de la misma es de $" + precioFinal + ". Muchas gracias por confiar en nosotros!");