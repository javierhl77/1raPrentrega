


// crear servidor
const express = require ("express");
const app = express();
const PUERTO = 8080;

const ProductManager = require("../src/controllers/productManager.js");
const cartManager = require ("../src/controllers/CartManager.js");
const productManager = new ProductManager("./src/models/productos.json");
const cartmanager = new cartManager("./src/models/carritos.json");

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

app.post("/api/products", async (req,res) => {
     const nuevoProducto = req.body;
     console.log(nuevoProducto);
     try {
        await productManager.addProduct(nuevoProducto),
        res.status(201).json({message: "producto agregado con exito"});
     } catch (error) {
        console.log("error al agregar producto", error);
        res.status(500).json({error: "error del servidor"});
     }

})

app.put("/api/products/:pid", async(req,res) => {
    let id = req.params.pid;
    const productoActualizado = req.body;
    try {
        await productManager.updateProduct(parseInt(id),productoActualizado )
        res.json({message: "producto actualizado corectanmente"});
    } catch (error) {
        console.log("no pudo actualizar");
        res.status(500).json({error: "error del server"});

    }
})

//****************** */
app.post("/api/carts", async (req,res) => {
    

    
     try {
        const nuevocarrito = await cartmanager.createCart();
        console.log(nuevocarrito);
        res.json(nuevocarrito);
        res.status(201).json({message: "carrito creado con exito"});
     } catch (error) {
        console.log("error al agregar carrito", error);
        res.status(500).json({error: "error del servidor"});
     }

})

app.post("/api/carts/:cid/productos/:pid", async (req,res) => {
  
  let cId = parseInt(req.params.cid);
  let pId = req.params.pid;
  try {
    const carrito = await cartmanager.AddProductToCart(cId,pId);
        console.log(carrito);
         res.json(carrito)
        res.status(201).json({message: "carrito creado con exito"});
    
  } catch (error) {
    console.log("error al cargar producto en el carrito",error);
    res.status(500).json({error: "error del servidor"});
  }
  
  
 
    
})

app.listen(PUERTO);