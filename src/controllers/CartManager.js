
const fs = require("fs").promises;
//import {promises as fs} from "fs";
//import path from "path";


class CartManager {

  static idcart = 0; // variable estatica para el id autoincrementable
  constructor(path){
      this.path = path;
      // arrays vacios para carts y products
      this.carts = [];
      //this.products = [];
    }   
     createCart = async () =>  {     // inicializar un carrito con su id, y array de productos
         CartManager.idcart++
         const arrayCarts = await this.leerArchivos();


         const newCart = {
            id : CartManager.idcart,
            productos : []
         }
         if (arrayCarts.length > 0) { // obtener el ultimo id
          CartManager.idcart = arrayCarts.reduce((maxId, product) => Math.max(maxId, product.id), 0);
        }
          newCart.id = ++CartManager.idcart;

         arrayCarts.push(newCart);
         //this.carts.push(newCart); // ingresar el newCart al array carts
         await this.guardarArchivo(arrayCarts);  // guardar el array carts al archivo
         return newCart;
        }
        leerArchivos = async () => {
            try {
              const respuesta = await fs.readFile(this.path, "utf-8");
              const arrayCarritos = JSON.parse(respuesta);
              return arrayCarritos;
            } catch (error) {
              console.log("Error al leer un archivo", error);
              throw error;
            }
          }

        
         guardarArchivo = async (arrayCarritos) => {
            try {
              await fs.writeFile(this.path, JSON.stringify(arrayCarritos, null,2));
            } catch (error) {
              console.log("Error al guardar el archivo", error);
              throw error;
            }
          }


      AddProductToCart = async (cartId,productId) =>  {
            const cart = this.carts.find(carrito => carrito.id === cartId);
            if(!cart) {
              console.log("no existe el carrito")
            }
            let prod = cart.productos.find(producto => producto.id === productId);
            if(!prod){
              prod = ({id: productId,cant: 1});
              cart.productos.push(prod);
            } else {
              prod.cant++;
            }
           await fs.writeFile( this.path,JSON.stringify(this.carts))
         }
      //readCarrito = async () => {
        //let respuesta = await fs.readFile(this.path, "utf-8")
        //return JSON.parse(respuesta); // retorna el array respuesta
      //}
      GetCart = async () => {
           let resp = await this.leerArchivos()

           console.log(resp);
          }
      GetCartById = async (id) => {
             let resp = await this.leerArchivos()
             const cart =  resp.find(carrito => carrito.id === id);
             if (!cart){
              console.log("no existe el carrito")
             } else{
              console.log(cart)
             }
      }

   }

   module.exports = CartManager;

  
   