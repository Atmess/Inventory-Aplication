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

async function deleteCategoryPost(req,res) {
    const categoriesId = req.params.id;
    const itemcategories = await db.getProductsByCategoryId(categoriesId);
    if(itemcategories.length > 0){
       return res.render("categoryDetail", { 
            errorMessage: "Cannot delete: This category still has products inside it."
        });
    }
    await db.deleteCategory(categoriesId);
    res.redirect("/")
}
async function CreateCategoryget(req,res) {
    res.render("form2")
}

async function createCategoryPost(req, res) {
    // 1. Pull the specific text out of the req.body object
    const categoryName = req.body.name;
    const categoryDescription = req.body.description;

    // 2. Pass them into your database function separately
    await db.insertCategory(categoryName, categoryDescription);
    
    res.redirect("/"); // Or wherever you redirect
}

async function UpdateStockPost(req,res) {
    const changeAmount = req.body.change;
    const productId = req.body.id;

    await db.UpdateStock(changeAmount,productId)
     res.redirect("/")
}
module.exports={getProduct,CreateProduckGet,CreateProduckPost,DeleteProductPost,deleteCategoryPost,CreateCategoryget,createCategoryPost,UpdateStockPost}