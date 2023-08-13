import express from "express";
import ProductManager from "./ProductManager.js";
const PORT = 8080;

const app = express();
const manager = new ProductManager();
const readProducts = manager.readProducts();
// console.log(await readProducts)

app.use(express.urlencoded({extended: true}))

app.get("/products", async (req, res)=>{
    let allProducts = await readProducts;
    let limit = parseInt(req.query.limit);
    let productsLimit = allProducts.slice(0,limit);
    !limit ? res.send(await readProducts)
    : res.send(productsLimit);
})

app.get("/products/:id", async(req, res)=>{
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find((prod => prod.id === id))
    !productById ? res.send({"error":"The product does not exist"})
    :res.send(productById)
})

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`);
})
