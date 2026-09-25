const db =require("../db/query")

async function getProduct (req,res) {
    const categories = await db.getCategories()
    const products = await db.getProduct();
    console.log(products)
    res.render("index",{title:"Product" , Product:products , categories:categories})
}
async function CreateProduckGet(req,res) {
    const categories = await db.getCategories();
    res.render("form",{categories:categories});
}
async function CreateProduckPost(req,res) {
    const products = req.body;
    await db.insertProduct(products)
    res.redirect("/")
}

async function DeleteProductPost(req,res) {
    const productId = req.params.id;
    await db.delateProduct(productId);
    res.redirect("/");
}

module.exports={getProduct,CreateProduckGet,CreateProduckPost,DeleteProductPost}