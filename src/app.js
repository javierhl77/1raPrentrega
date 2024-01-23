


// crear servidor
const express = require ("express");
const app = express();
const PUERTO = 8080;

const ProductManager = require("../src/controllers/productManager.js");
const productManager = new ProductManager("./src/models/productos.json");

app.use(express.json());

//listar todos los productos

app.get("/api/products", async (req, res) => {
  
    try {
        const limit = req.query.limit;
        const productos = await productManager.getProducts();

        if (limit) {
            res.json(productos.slice(0, limit));
        } else {
            res.json(productos);
        }
    } catch (error) {
        console.log("Error al obtener los productos", error);
        res.status(500).json({ error: "Error del servidor" });
    }

})

// devolver el producto correspondiente a su id
app.get("/api/products/:pid", async (req,res) => {
     let id = req.params.pid;
     try {
        const productos = await productManager.getProductsById(parseInt(id))
        if (!productos){
            res.json({
                error: "producto no encontrado"
            })
        } else {
            res.json(productos)
        }
     } catch (error) {
        console.log("Error al obtener los productos", error);
        res.status(500).json({ error: "Error del servidor" });
     }


})
app.listen(PUERTO);