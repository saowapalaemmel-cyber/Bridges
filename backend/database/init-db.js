const db = require('./database');

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    orderTime TEXT NOT NULL,
    estimatedDeliveryTime TEXT NOT NULL,
    cost TEXT NOT NULL,
    products TEXT NOT NULL,
    deliveryOptionId TEXT NOT NULL
  );
`);

console.log('Orders table created successfully.');

db.close();