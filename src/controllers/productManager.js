

const fs = require("fs").promises;
//import {promises as fs} from "fs";
//import path from "path";

class ProductManager {
  constructor(path){
    this.path = path; //"./products.txt"  // se crea la ruta del archivo donde se va a alojar el array de productos
    this.products = []     // array de productos
  }

  static id = 0;

  addProduct = async ( title,description,price,img,code,stock) => {

    ProductManager.id++ // id se incrementa en 1, cada vez que se agrega un produto
    let newProd = {
      title,
      description,
      price,
      img,
      code,
      stock,
      id: ProductManager.id
    }

    this.products.push(newProd) // se agrega  el nuevo producto al array products


   // 
    await fs.writeFile( this.path,JSON.stringify(this.products))

  }
  // readProducto : funcion para leer el archivo y pasarlo a la variable respuesta
  readProducto = async () => {
    let respuesta = await fs.readFile(this.path, "utf-8")
    return JSON.parse(respuesta); // retorna el array respuesta
  }

  getProducts = async ()  => {

    let respuesta1 = await this.readProducto()  // llama a la funcion readProducto y se asigna a la variable respuesta1 como array
    return respuesta1;
   }

  getProductsById = async (id) => {
     let resp2 = await this.readProducto() // llama a la funcion readProducto y se asigna en resp2
     let resultado = resp2.find(product => product.id === id) // en resultado guarda el objeto correspondiente al id
     //console.log(resultado)
     // chequeo con if si se cumple la condicion 
     if ( !resp2.find(product => product.id === id) ) {
      console.log("no existe el producto")
     } else {
      console.log(resultado);
      return resultado;
     }
  }


  deleteProductById = async (id ) => {
    let resp = await this.readProducto(); // paso  a resp el archivo 
    let prodFilter = resp.filter(products => products.id != id) // en prodFilter guardo los objetos menos el que corresponde al id con filter
    await fs.writeFile( this.path, JSON.stringify(prodFilter)) // escribo en el archivo con el nuevo arreglo prodFilter

    console.log("producto eliminado");
  }
   // *****************************
  // updateProduct : actualizar producto 
  // ( {id, ...producto}) separo el id del resto de los atributos de producto para conservar el id
  
  //a) eliminar producto a modificar ,usando deleteProductById
  // b)volverlo a agregar con los cambios ,en un nuevo array proMod ,

  updateProducts = async ( {id, ...producto}) =>  {
   await this.deleteProductById(id); // borrar el producto que quiero actualizar 
   let prod = await this.readProducto(); // prod : guarda el producto que quedo
  
   let prodMod = [ {id, ...producto}, ...prod]; // formar otro array con el producto modificado + los demas productos
   await fs.writeFile( this.path, JSON.stringify(prodMod)); // guardo en el archivo el nuevo array( prodMod)


   //console.log(prodMod);
  }
   


}

module.exports = ProductManager;