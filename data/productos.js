const chalk = require('chalk');

const productos = [
    { id: 1, nombre: "pan", precio: 2.00, categoria: "pana", stock: 20 },
    { id: 2, nombre: "leche", precio: 3.50, categoria: "lacteos", stock: 15 },
    { id: 3, nombre: "queso", precio: 7.00, categoria: "lacteos", stock: 10 },
    { id: 4, nombre: "galletas", precio: 4.00, categoria: "snacks", stock: 25 },
    { id: 5, nombre: "pan de chocolate", precio: 2.50, categoria: "pan", stock: 30 },
    { id: 6, nombre: "pan integral", precio: 2.80, categoria: "pan", stock: 40 },
    { id: 7, nombre: "croissants", precio: 3.00, categoria: "pan", stock: 25 },
    { id: 8, nombre: "barras de pan", precio: 1.90, categoria: "pan", stock: 35 },
    { id: 9, nombre: "pan de pita", precio: 2.00, categoria: "pan", stock: 50 },
    { id: 10, nombre: "pastel de vainilla", precio: 4.50, categoria: "pastel", stock: 15 },
    { id: 11, nombre: "pastel de manzana", precio: 4.80, categoria: "pastel", stock: 18 },
    { id: 12, nombre: "magdalenas", precio: 2.20, categoria: "pan", stock: 40 },
    { id: 13, nombre: "pan de molde", precio: 2.60, categoria: "pan", stock: 50 },
    { id: 14, nombre: "panecillos", precio: 2.00, categoria: "pan", stock: 60 },
    { id: 15, nombre: "relleno de crema", precio: 3.50, categoria: "postre", stock: 30 },
    { id: 16, nombre: "harina de trigo", precio: 1.80, categoria: "insumo", stock: 100 },
    { id: 17, nombre: "levadura", precio: 0.80, categoria: "insumo", stock: 120 },
    { id: 18, nombre: "azúcar glas", precio: 1.50, categoria: "insumo", stock: 80 },
    { id: 19, nombre: "mantequilla", precio: 3.20, categoria: "lacteos", stock: 60 },
    { id: 20, nombre: "chocolate en polvo", precio: 2.30, categoria: "insumo", stock: 40 }
];

function mostrarlista() {
    const productosOrdenados = productos.sort((a, b) => a.id - b.id);
    const idWidth = 2;
    const nombreWidth = 18;
    const precioWidth = 7;
    const categoriaWidth = 12;
    const stockWidth = 4;

    console.log(chalk.bold("***** LISTA DE PRODUCTOS *******"));
    console.log(chalk.bold("-".repeat(idWidth + nombreWidth + precioWidth + categoriaWidth + stockWidth + 15))); // 15 es para el margen extra
    console.log(chalk.bold("ID | NOMBRE             | PRECIO    | CATEGORÍA    | STOCK"));
    console.log(chalk.bold("-".repeat(idWidth + nombreWidth + precioWidth + categoriaWidth + stockWidth + 15)));

    productosOrdenados.forEach(p => {
        console.log(
            `${p.id.toString().padEnd(idWidth)} | ${chalk.cyan(p.nombre.padEnd(nombreWidth))} | ` + 
            `S/${chalk.yellow(p.precio.toFixed(2).padEnd(precioWidth))} | ` + 
            `${chalk.green(p.categoria.padEnd(categoriaWidth))} | ` + 
            `${chalk.magenta(p.stock.toString().padStart(stockWidth))}`
        );
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
