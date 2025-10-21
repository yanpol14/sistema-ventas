const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const producto = require('./data/productos');
const venta = require('./services/ventas');

function mostrarMenu() {
    console.log("\n--- BIENVENIDOS al Sistema de Ventas DELICIA ---");
    console.log("1. Registrar Venta.");
    console.log("2. Listar productos.");
    console.log("3. Buscar producto.");
    console.log("4. Ver carrito.");
    console.log("5. Calcular total.");
    console.log("6. Generar Ticket.");
    console.log("7. Reportes.");
    console.log("8. Salir.");

    readline.question("Seleccione una opción (1-8): ", (opcion) => {
        switch (opcion.trim()) {
            case '1':
                console.log("\n****** REGISTRAR NUEVA VENTA *******");
                producto.mostrarlista();
                venta.agregarVenta();
                break;

            case '2':
                console.log("\n****** LISTA DE PRODUCTOS *******");
                producto.mostrarlista();
                mostrarMenu();
                break;
            
            case '3':
                readline.question("Ingrese el nombre o categoría del producto a buscar: ", (termino) => {
                producto.mostrarBusqueda(termino);
                mostrarMenu();
                });
                break;

            case '4':
                console.log("\n****** CARRITO DE COMPRAS *******");
                venta.verCarrito();
                mostrarMenu();
                break;

            case '5':
                console.log("\n******* CÁLCULO DE TOTAL *******");
                venta.calcularTotal();
                mostrarMenu();
                break;

            case '6':
                console.log("\n******* GENERAR TICKET DE VENTA *******");
                venta.mostrarResumen();
                mostrarMenu();
                break;

            case '8':
                console.log("Gracias por usar el Sistema de Ventas DELICIA. ¡Hasta luego!");
                readline.close(); 
                break;

            default:
                console.log("ERROR, seleccione una opción válida (1-8).");
                mostrarMenu();
        }
    });
}

venta.inicializar(readline, producto.buscarProducto, mostrarMenu);
mostrarMenu();
