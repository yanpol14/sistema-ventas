let carrito = [];
let readline;
let buscarProducto;
let callbackMenu;

function inicializar(rl, buscar, volverMenu) {
    readline = rl;
    buscarProducto = buscar;
    callbackMenu = volverMenu;
}

function agregarCarrito(nombre) {
    const producto = buscarProducto(nombre);
    if (!producto) {
        console.log(`Producto "${nombre}" no encontrado.`);
        return;
    }

    const existente = carrito.find(item => item.nombre.toLowerCase() === nombre.toLowerCase());
    if (existente) {
        existente.cantidad += 1;
        existente.total = existente.cantidad * existente.precioUnitario;
        console.log(`Se aumentó la cantidad de "${existente.nombre}" a ${existente.cantidad}.`);
    } else {
        carrito.push({
            nombre: producto.nombre,
            cantidad: 1,
            precioUnitario: producto.precio,
            total: producto.precio
        });
        console.log(`${producto.nombre} agregado al carrito.`);
    }
}

function agregarVenta() {
    readline.question("Ingrese el nombre del producto (o 'salir' para regresar al menú): ", (nombre) => {
        if (nombre.toLowerCase() === "salir") {
            console.log("\nRegresando al menú principal...\n");
            callbackMenu();
            return;
        }
        agregarCarrito(nombre);
        agregarVenta();
    });
}

function mostrarResumen() {
    console.log("\nRESUMEN DE COMPRA:");
    carrito.forEach((p, i) => {
        console.log(`${i + 1}. ${p.nombre} x${p.cantidad} = S/${p.total.toFixed(2)}`);
    });

    const { subtotal, descuento, total } = calcularTotal();
    console.log(`\nSubtotal: S/${subtotal.toFixed(2)}`);
    console.log(`Descuento: S/${descuento.toFixed(2)}`);
    console.log(`Total a pagar: S/${total.toFixed(2)}\n`);
}

function calcularTotal() {
    const subtotal = carrito.reduce((sum, p) => sum + p.total, 0);
    let descuento = 0;
    if (subtotal > 50) {
        descuento = subtotal * 0.10;
    } else if (subtotal >= 20 && subtotal <= 50) {
        descuento = subtotal * 0.05;
    }  
    const total = subtotal - descuento;
    return { subtotal, descuento, total };
}

function verCarrito() {
    if (carrito.length === 0) {
        console.log("\n El carrito está vacío.\n");
        return;
    }

    console.log("\n CARRITO ACTUAL DE COMPRAS:");
    console.log("---------------------------------------");
    console.log("Producto       | Cant | Precio | Total");
    console.log("---------------------------------------");

    carrito.forEach(item => {
        console.log(`${item.nombre.padEnd(14)} | ${item.cantidad.toString().padEnd(5)} | S/${item.precioUnitario.toFixed(2).padEnd(6)} | S/${item.total.toFixed(2)}`);
    });

    const totalCarrito = carrito.reduce((sum, item) => sum + item.total, 0);
    console.log("---------------------------------------");
    console.log(`Total general: S/${totalCarrito.toFixed(2)}\n`);
}

module.exports = { 
    inicializar,
    mostrarResumen,
    calcularTotal,
    agregarVenta,
    verCarrito
};
