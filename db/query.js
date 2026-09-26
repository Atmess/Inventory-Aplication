const Pool =require("./Pool")

async function getCategories() {
  
    const {rows} = await Pool.query("SELECT * FROM categories ")
    return rows;
}

async function getProduct() {
    const {rows} = await Pool.query("SELECT products.*, categories.name AS category_name FROM products JOIN categories ON products.category_id = categories.id;")
    return rows;
}

async function getProductsByCategoryId(categoryId) {
    // We use $1 to safely insert the categoryId and prevent SQL injection
    const { rows } = await Pool.query(
        "SELECT * FROM products WHERE category_id = $1", 
        [categoryId]
    );
    
    // This returns an array of products. If empty, it returns []
    return rows; 
}


async function insertProduct(productData) {
  // We use $1, $2, etc., to protect against SQL injection!
  // Never pass user input directly into the SQL string.
  const SQL = `
    INSERT INTO products (category_id, name, description, price, stock)
    VALUES ($1, $2, $3, $4, $5)
  `;
  
  // The values array must exactly match the order of the $1, $2 placeholders
  const values = [
    productData.category_id, 
    productData.name, 
    productData.description, 
    productData.price, 
    productData.stock
  ];

  await Pool.query(SQL, values);
}

async function delateProduct(productId) {
  await Pool.query("DELETE FROM products WHERE id = $1",[productId])
}
async function deleteCategory(categoriesId) {
   await Pool.query("DELETE FROM categories WHERE id = $1 ",[categoriesId])
}
async function insertCategory(name,description) {
    await Pool.query("INSERT INTO categories (name,description) VALUES ($1,$2)",[name,description])
}

async function UpdateStock(changeAmount,productId) {
  try{
    await Pool.query("UPDATE products SET stock = stock + $1 WHERE id = $2;", [changeAmount,productId])
  } catch (error) {
        console.error("Error updating stock:", error);
      }

  }
module.exports={getCategories,getProduct,insertProduct,delateProduct,deleteCategory,insertCategory,getProductsByCategoryId,UpdateStock}