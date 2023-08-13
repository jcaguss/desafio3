import {promises as fs} from 'fs'

export default class ProductManager {

    constructor(path) {
        this.path = './desafio3/productos.json' // Archivo json
        this.products = []; //Array vacio de productos
    }

    writeProducts = async (prod) =>{ // Metodo que escribe productos en el archivo path en formato JSON 
        let products = await fs.writeFile(this.path, JSON.stringify(prod))
        return products
    }

    readProducts = async () => { // Metodo para leer todos los Productos
        try{ // Bloque a iterar
            let read = await fs.readFile(this.path, 'utf-8')
            return await JSON.parse(read);
        }catch{ // respuesta de una excepcion
            console.log("error")
            return [] // Retornamos un array vacio 
        }
    }

    addProducts = async (title, description, price, thumbnail, code, stock) => { // Metodo para añadir productos
        !title || !description || !price || !thumbnail || !code || !stock 
        ? console.log('The arguments are not defined')
        : this.products.find(prod => prod.code === code )
        ? console.log("The product already exists")
        : this.products.push(new Product(title, description, price, thumbnail, code, stock)); 
        await this.writeProducts(this.products)
    }

    getProducts = async () => { // Metodo para mostrar los productos del archivo json
        let res = await this.readProducts()
        console.log(res)
    }

    getProductById = async (id) =>{ // Metodo para mostrar un producto por su id
        let  res = await this.readProducts()
        const product = res.find(product => product.id === id);
        !product ? console.log("Not found") : console.log(product);
        return product;
    }

    delateProductsById = async (id) =>{ // Metodo para eliminar por el id
        let  res = await this.readProducts() 
        const prod = res.filter(product => product.id !== id)
        !prod ? console.log('Not found')
        :await this.writeProducts(prod)
    }

    updateProducts = async ({id, ...product}) => { // Metodo para modificar
        await this.delateProductsById(id)
        let productOld = await this.readProducts();
        let updateProduct = [{...product , id}, ...productOld]
        await this.writeProducts(updateProduct)
    }
} 

class Product {
    static id = 1; // Contador para los id

    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = Product.id++; // Incrementamos el id en 1
    }
}

// const manager = new ProductManager(); // Creamos una instancia de ProductManager
// manager.getProducts(); // Mostramos el array de productos vacio 
// manager.addProducts('Laptop', 'Laptop MSI ...', 1500, 'url/url', 25, 23); // Añadimos un producto
// manager.addProducts('Pelota ', 'Championes Puma ...', 120, 'url/u/url',252 , 123); // Añadimos un segundo producto
// manager.addProducts('Campera ', 'Campera Adidas ...', 234, 'url/ur/url',253 , 113); // Añadimos un tercer producto
// manager.addProducts('Lapiz ', 'Lapiz de dibujo ...', 15, 'url/urll/url',33 , 1);
// manager.addProducts('Cuadernola ', 'Cuadernola 75 hojas ...', 12, 'url/ur/url',24343 , 4343);
// manager.addProducts('Mate ', 'Mate de mate ...', 34, 'url/urll/url',2123453 , 1123413);
// manager.addProducts('PC ', 'PC gamer hd xd ...', 7234, 'urll/urlll/url',22453 , 11433);
// manager.addProducts('Lentes ', 'Lentes de sol ...', 234, 'urll/urlll/url',212342 , 11213);
// manager.addProducts('Termo ', 'Termo nose ...', 234, 'urll/url/urlll',251233 , 113424);
// manager.addProducts('Cafe ', 'Cafeina necesito ...', 234, 'urlll/urll/urll',251113 , 1123413);


// manager.updateProducts({ // Modificamos el producto
//     title : 'Auriculares',
//     description :  'Auriculares JBL ...',
//     price :  200,
//     thumbnail : 'url/url/url',
//     code :  222,
//     stock :  23,
//     id : 1
// }); 
// manager.getProducts(); // Mostramos los productos añadidos
// manager.getProductById(2);// Mostramos el producto añadido por su id
// manager.delateProductsById(1) //Eliminamos un producto por su id
// manager.getProducts();

