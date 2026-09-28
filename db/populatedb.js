const { Client } = require('pg');
require('dotenv').config();

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


INSERT INTO products (category_id, name, description, price, stock) 
VALUES 
  -- Playmats (Category 1)
  (1, 'Dark Magician Girl Playmat', 'Official rubber-backed duel mat', 30.00, 15),
  (1, 'Kaiba Corporation Duel Field', 'Premium cloth surface with KC logo', 35.00, 8),
  (1, 'I:P Masquerena Mat', 'Tournament exclusive 2024 edition', 45.00, 3),
  (1, 'Slifer the Sky Dragon Playmat', 'Classic red God Card design', 25.00, 12),
  (1, 'Albaz - Ecclesia - Tri-Brigade Mat', 'Storyline full artwork mat', 28.00, 5),
  
  -- Sleeves (Category 2)
  (2, 'Dragon Shield Matte Black (Japanese Size)', 'High durability, 60ct', 8.50, 100),
  (2, 'KMC Hyper Matte White (Japanese Size)', 'Premium tournament sleeves, 60ct', 9.00, 80),
  (2, 'Ultimate Guard Katana Blue', 'Precision smooth shuffle feel, 60ct', 10.50, 45),
  (2, 'Millennium Puzzle Sleeves', 'Official Konami art, 50ct', 15.00, 20),
  (2, 'Kuriboh Art Sleeves', 'Holographic foil finish, 50ct', 12.00, 30),
  (2, 'Ash Blossom & Joyous Spring Sleeves', 'Official tournament legal, 50ct', 14.00, 15);


`;

async function main() {
  console.log('Seeding database...');
  // Connect directly using a Client just for this script
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log('Done!');
}

main();
