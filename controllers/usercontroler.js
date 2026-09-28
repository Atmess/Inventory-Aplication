
const db =require("../db/query")

async function getProduct (req,res) {
    try{
    const categories = await db.getCategories()
    const products = await db.getProduct();
    console.log(products)
    res.render("index",{title:"Product" , Product:products , categories:categories})
    }catch (error) {
        console.error("Error fetching database:", error);
        res.status(500).send("Failed to fetching database.");
    }
}
async function CreateProduckGet(req,res) {
    
    try{
    const categories = await db.getCategories();
    res.render("form",{categories:categories});
    }catch (error) {
        console.error("Error fetching database:", error);
        res.status(500).send("Failed to fetching database.");
    }
}
async function CreateProduckPost(req,res) {
    try{
    const products = req.body;
    await db.insertProduct(products)
    res.redirect("/")
    }catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send("Failed to create product.");
    }
}

async function DeleteProductPost(req,res) {
    try{
    const productId = req.params.id;
    await db.delateProduct(productId);
    res.redirect("/");
    }catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Failed to delete product.");
    }
}

async function deleteCategoryPost(req,res) {
    try{
    const categoriesId = req.params.id;
    const itemcategories = await db.getProductsByCategoryId(categoriesId);
    if(itemcategories.length > 0){
       return res.render("categoryDetail", { 
            errorMessage: "Cannot delete: This category still has products inside it."
        });
    }
    await db.deleteCategory(categoriesId);
    res.redirect("/")
}catch (error) {
        console.error("Error fetching database:", error);
        res.status(500).send("Failed to fetching database.");
    }
}
 function CreateCategoryget(req,res) {
    res.render("form2")
}

async function createCategoryPost(req, res) {
    try{
    // 1. Pull the specific text out of the req.body object
    const categoryName = req.body.name;
    const categoryDescription = req.body.description;

    // 2. Pass them into your database function separately
    await db.insertCategory(categoryName, categoryDescription);
    
    res.redirect("/"); // Or wherever you redirect
    }catch (error) {
        console.error("Error creating category:", error);
        res.status(500).send("Failed to create category.");
    }
}

async function UpdateStockPost(req,res) {
    try{
    const changeAmount = req.body.change;
    const productId = req.params.id;

    await db.UpdateStock(changeAmount,productId)
     res.redirect("/")
    }catch (error) {
        console.error("Error updating stock:", error);
        res.status(500).send("Failed to update stock.");
    }
}

async function Selectcategories(req,res) {
    try{
    const categoryId = req.params.id;
    const filterproduct = await db.choseCategory(categoryId);
    const categories = await db.getCategories();
    res.render("index",{title:"Product" , Product:filterproduct , categories:categories})
    } catch (error) {
        console.error("Error fetching database:", error);
        res.status(500).send("Failed to fetching database.");
    }
}
module.exports={getProduct,CreateProduckGet,CreateProduckPost,DeleteProductPost,deleteCategoryPost,CreateCategoryget,createCategoryPost,UpdateStockPost,Selectcategories}