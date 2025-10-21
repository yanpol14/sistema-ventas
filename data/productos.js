const chalk = require('chalk'); // ✅ Librería para colorear texto en consola

const productos = [
    { id: 1, nombre: "pan", precio: 2.00, categoria: "panaderia", stock: 20 },
    { id: 2, nombre: "leche", precio: 3.50, categoria: "lacteos", stock: 15 },
    { id: 3, nombre: "queso", precio: 7.00, categoria: "lacteos", stock: 10 },
    { id: 4, nombre: "galletas", precio: 4.00, categoria: "snacks", stock: 25 },
];

function mostrarlista() {
    console.log(chalk.bold("---------------------------------------------"));
    console.log(chalk.bold("ID | NOMBRE     | PRECIO  | CATEGORÍA   | STOCK"));
    console.log(chalk.bold("---------------------------------------------"));
    productos.forEach(p => {
        console.log(`${p.id.toString().padEnd(2)} | ${chalk.cyan(p.nombre.padEnd(10))} | S/${chalk.yellow(p.precio.toFixed(2).padEnd(6))} | ${chalk.green(p.categoria.padEnd(10))} | ${chalk.magenta(p.stock)}`);
    });
}

function buscarProducto(nombre) {
    return productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
}

function lista(){
    console.log(chalk.bold("\nPRODUCTOS DISPONIBLES:"));
    console.log(chalk.bold("---------------------------------------------"));
    console.log(chalk.bold("ID | NOMBRE   | PRECIO"));
    productos.forEach(p => {
        console.log(`${p.id} | ${chalk.cyan(p.nombre)} -> S/${chalk.yellow(p.precio.toFixed(2))}`);
    });
}

function mostrarBusqueda(termino) {
    const texto = termino.toLowerCase();

    const producto = productos.find(p => p.nombre.toLowerCase() === texto);
    if (producto) {
        console.log(chalk.bold("\nPRODUCTO ENCONTRADO:"));
        console.log("---------------------------------------------");
        console.log(`ID: ${chalk.cyan(producto.id)}`);
        console.log(`Nombre: ${chalk.cyan(producto.nombre)}`);
        console.log(`Precio: ${chalk.yellow(`S/${producto.precio.toFixed(2)}`)}`);
        console.log(`Categoría: ${chalk.green(producto.categoria)}`);
        console.log(`Stock disponible: ${producto.stock > 0 ? chalk.magenta(producto.stock) : chalk.red("SIN STOCK")}`);
        console.log("---------------------------------------------");
        return producto;
    }

    const productosCategoria = productos.filter(p => p.categoria.toLowerCase() === texto);
    if (productosCategoria.length > 0) {
        console.log(chalk.bold(`\nPRODUCTOS EN LA CATEGORÍA "${termino.toUpperCase()}":`));
        console.log("---------------------------------------------");
        productosCategoria.forEach(p => {
            console.log(`ID: ${chalk.cyan(p.id)} | ${p.nombre} - ${chalk.yellow(`S/${p.precio.toFixed(2)}`)} | Stock: ${chalk.magenta(p.stock)}`);
        });
        console.log("---------------------------------------------");
        return productosCategoria;
    }

    console.log(chalk.red(`No se encontró ningún producto o categoría llamada "${termino}".`));
    return null;
}

function actualizarStock(nombre) {
    const producto = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    if (producto && producto.stock > 0) {
        producto.stock -= 1;
        return true;
    } else {
        return false;
    }
}

module.exports = { 
    productos,
    mostrarlista,
    buscarProducto,
    lista,
    mostrarBusqueda,
    actualizarStock
};
