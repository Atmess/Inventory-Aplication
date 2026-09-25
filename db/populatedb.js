const { Client } = require('pg');
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR ( 255 ) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_id INTEGER REFERENCES categories(id),
  name VARCHAR ( 255 ) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0
);

INSERT INTO categories (name, description) 
VALUES 
  ('Playmats', ' gaming mats'),
  ('Sleeves', 'Card protectors');

INSERT INTO products (category_id, name, description, price, stock) 
VALUES 
  (1, '25th Anniversary Playmat', 'Official YGO mat', 25.00, 10),
  (2, 'Dragon Shield Red', 'Matte red sleeves, 100ct', 12.00, 50);
`;

async function main() {
  console.log("Seeding database...");
  // Connect directly using a Client just for this script
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  
  await client.connect();
  await client.query(SQL);
  await client.end();
  
  console.log("Done!");
}

main();