const chalk = require('chalk');

let carrito = [];
let readline;
let buscarProducto;
let callbackMenu;
let historialVentas = []; 
let actualizarStock;

function inicializar(rl, buscar, volverMenu, actualizar) {
    readline = rl;
    buscarProducto = buscar;
    callbackMenu = volverMenu;
    actualizarStock = actualizar;
}

function agregarCarrito(nombre) {
    const producto = buscarProducto(nombre);
    if (!producto) {
        console.log(chalk.red(`Producto "${nombre}" no encontrado.`));
        return;
    }

    const existente = carrito.find(item => item.nombre.toLowerCase() === nombre.toLowerCase());
    if (existente) {
        existente.cantidad += 1;
        existente.total = existente.cantidad * existente.precioUnitario;
        console.log(chalk.yellow(`Se aumentó la cantidad de "${existente.nombre}" a ${existente.cantidad}.`));
    } else {
        carrito.push({
            nombre: producto.nombre,
            cantidad: 1,
            precioUnitario: producto.precio,
            total: producto.precio
        });
        console.log(chalk.green(`${producto.nombre} agregado al carrito.`));
    }
}

function agregarVenta() {
    readline.question("Ingrese el nombre del producto (o 'salir' para regresar al menú): ", (nombre) => {
        if (nombre.toLowerCase() === "salir" || nombre.toLowerCase() === "s") {
            console.log(chalk.cyan("\nRegresando al menú principal...\n"));
            if (carrito.length > 0) {
                const { subtotal, descuento, igv, total } = calcularTotal(false);
                historialVentas.push({
                    fecha: new Date().toLocaleString(),
                    productos: [...carrito],
                    subtotal,
                    descuento,
                    igv,
                    total
                });
            }
            callbackMenu();
            return;
        }
        agregarCarrito(nombre);
        agregarVenta();
    });
}

function calcularTotal(mostrarDetalle = true) {
    const subtotal = carrito.reduce((sum, p) => sum + p.total, 0);
    let descuento = 0;

    // 🔹 Descuento escalonado
    if (subtotal >= 100) {
        descuento = subtotal * 0.15;
    } else if (subtotal >= 50 && subtotal < 100) {
        descuento = subtotal * 0.10;
    } else if (subtotal >= 20 && subtotal < 50) {
        descuento = subtotal * 0.05;
    }

    const subtotalConDescuento = subtotal - descuento;
    const igv = subtotalConDescuento * 0.18;
    const total = subtotalConDescuento + igv;

    if (mostrarDetalle) {
        console.log(chalk.bold("\n------ CÁLCULO DETALLADO ------"));
        console.log(`Subtotal: ${chalk.yellow(`S/${subtotal.toFixed(2)}`)}`);
        console.log(`Descuento aplicado: ${chalk.green(`S/${descuento.toFixed(2)}`)}`);
        console.log(`Subtotal con descuento: ${chalk.blue(`S/${subtotalConDescuento.toFixed(2)}`)}`);
        console.log(`IGV (18%): ${chalk.magenta(`S/${igv.toFixed(2)}`)}`);
        console.log(`Total final: ${chalk.bold(`S/${total.toFixed(2)}`)}`);
        console.log(chalk.bold("-------------------------------\n"));
    }

    return { subtotal, descuento, igv, total };
}

function verCarrito() {
    if (carrito.length === 0) {
        console.log(chalk.red("\nEl carrito está vacío.\n"));
        return;
    }

    console.log(chalk.bold("\nCARRITO ACTUAL DE COMPRAS:"));
    console.log("--------------------------------------------------");
    console.log("Producto       | Cant | Precio(U) | Subtotal");
    console.log("--------------------------------------------------");

    carrito.forEach(item => {
        const subtotalItem = item.cantidad * item.precioUnitario;
        console.log(
            `${item.nombre.padEnd(14)} | ${item.cantidad.toString().padEnd(4)} | S/${item.precioUnitario
                .toFixed(2)
                .padEnd(7)} | S/${subtotalItem.toFixed(2)}`
        );
    });

    console.log("--------------------------------------------------");
    calcularTotal(true);
}

function reporteVentas() {
    if (historialVentas.length === 0) {
        console.log(chalk.red("\nNo hay ventas registradas aún.\n"));
        return;
    }

    console.log(chalk.bold("\n========== REPORTE DE VENTAS =========="));
    let totalGeneral = 0;
    let totalIGV = 0;

    historialVentas.forEach((venta, index) => {
        console.log(chalk.cyan(`\nVenta #${index + 1} - Fecha: ${venta.fecha}`));
        console.log("---------------------------------------");
        venta.productos.forEach(p => {
            console.log(`${p.nombre.padEnd(14)} | Cant: ${p.cantidad} | Total: S/${p.total.toFixed(2)}`);
        });
        console.log("---------------------------------------");
        console.log(`Subtotal: S/${venta.subtotal.toFixed(2)}`);
        console.log(`Descuento: S/${venta.descuento.toFixed(2)}`);
        console.log(`IGV (18%): S/${venta.igv.toFixed(2)}`);
        console.log(`Total: ${chalk.bold(`S/${venta.total.toFixed(2)}`)}`);
        totalGeneral += venta.total;
        totalIGV += venta.igv;
    });

    console.log(chalk.bold("\n======================================="));
    console.log(`TOTAL GENERAL IGV COBRADO: ${chalk.magenta(`S/${totalIGV.toFixed(2)}`)}`);
    console.log(`TOTAL GENERAL VENDIDO: ${chalk.green(`S/${totalGeneral.toFixed(2)}`)}\n`);
}

module.exports = { 
    inicializar,
    agregarCarrito,
    agregarVenta,
    verCarrito,
    calcularTotal,
    reporteVentas
};
