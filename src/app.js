


// crear servidor
const express = require ("express");
const app = express();
const PUERTO = 8080;

const productsRouter = require("./routes/products.router.js");
const cartsRouter = require ("./routes/carts.router.js");



//const productManager = new ProductManager("./src/models/productos.json");
//const cartmanager = new cartManager("./src/models/carritos.json");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


app.listen(PUERTO, () => {
    console.log(`escuchando en el puerto: ${PUERTO}`);
});