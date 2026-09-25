const Pool =require("./Pool")

async function getCategories() {
  
    const {rows} = await Pool.query("SELECT * FROM categories ")
    return rows;
}

async function getProduct() {
  const SQL = `
    SELECT products.*, categories.name AS category_name
    FROM products
    JOIN categories ON products.category_id = categories.id;
  `;
    const {rows} = await Pool.query(SQL)
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

module.exports={getCategories,getProduct,insertProduct,delateProduct}