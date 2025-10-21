const chalk = require('chalk');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const producto = require('./data/productos');
const venta = require('./services/ventas');

function mostrarMenu() {
    console.log(chalk.blue("\n--- BIENVENIDOS al Sistema de Ventas DELICIA ---"));
    console.log(chalk.yellow("1.") + " Registrar Venta.");
    console.log(chalk.yellow("2.") + " Listar productos.");
    console.log(chalk.yellow("3.") + " Buscar producto.");
    console.log(chalk.yellow("4.") + " Ver carrito.");
    console.log(chalk.yellow("5.") + " Calcular total.");
    console.log(chalk.yellow("6.") + " Generar Ticket.");
    console.log(chalk.yellow("7.") + " Reportes.");
    console.log(chalk.yellow("8.") + " Salir.");

    readline.question(chalk.cyan("Seleccione una opción (1-8): "), (opcion) => {
        switch (opcion.trim()) {
            case '1':
                console.log(chalk.green("\n****** REGISTRAR NUEVA VENTA *******"));
                producto.lista();
                venta.agregarVenta();
                break;

            case '2':
                console.log(chalk.green("\n****** LISTA DE PRODUCTOS *******"));
                producto.mostrarlista();
                mostrarMenu();
                break;
            
            case '3':
                readline.question(chalk.cyan("Ingrese el nombre o categoría del producto a buscar: "), (termino) => {
                    producto.mostrarBusqueda(termino);
                    mostrarMenu();
                });
                break;

            case '4':
                console.log(chalk.green("\n****** CARRITO DE COMPRAS *******"));
                venta.verCarrito();
                mostrarMenu();
                break;

            case '5':
                console.log(chalk.green("\n******* CÁLCULO DE TOTAL *******"));
                venta.calcularTotal();
                mostrarMenu();
                break;

            case '6':
                console.log(chalk.green("\n******* GENERAR TICKET DE VENTA *******"));
                venta.mostrarResumen();
                mostrarMenu();
                break;
            
            case '7':
                console.log(chalk.green("\n******* REPORTES DE VENTAS *******"));
                venta.reporteVentas();
                mostrarMenu();
                break;

            case '8':
                console.log(chalk.yellow("Gracias por usar el Sistema de Ventas DELICIA. ¡Hasta luego!"));
                readline.close(); 
                break;

            default:
                console.log(chalk.red("ERROR, seleccione una opción válida (1-8)."));
                mostrarMenu();
        }
    });
}

venta.inicializar(readline, producto.buscarProducto, mostrarMenu);
mostrarMenu();
