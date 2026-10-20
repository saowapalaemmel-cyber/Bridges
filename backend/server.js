const express = require('express');
const cors = require('cors');
const { menus } = require('./data/menus');
const { deliveryOptions } = require('./data/deliveryOptions');
const { orders, saveOrders } = require('./data/orders');
const db = require('./database/database');
const { getOrderStatus, calculateOrderCost, createOrder } = require('./services/orderService');

const app = express();

app.use(cors());
app.use(express.json());

const insertOrder = db.prepare(`
  INSERT INTO orders (
    id,
    orderTime,
    estimatedDeliveryTime,
    cost,
    products,
    deliveryOptionId
  )
  VALUES (?, ?, ?, ?, ?, ?)
`);

const getAllOrders = db.prepare(`
  SELECT * FROM orders
  ORDER BY orderTime DESC
`);

const getOrderById = db.prepare(
  'SELECT * FROM orders WHERE id = ?'
);

app.get('/api/menu', (req, res) => {
  res.json(menus);
});

app.get('/api/menu/:id', (req, res) => {
  const menuId = req.params.id;

  const menu = menus.find((menu) => {
    return menu.id === menuId;
  });

  res.json(menu);
});

app.post('/api/orders', (req, res, next) => {
  const { items, deliveryOptionId } = req.body;

  //  Validation
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: 'Order must contain at least one item'
    });
  }

  const deliveryOption = deliveryOptions.find((option) => {
    return option.id === deliveryOptionId;
  });

  if (!deliveryOption) {
    return res.status(400).json({
      message: 'Invalid delivery option'
    });
  }

  for (const item of items) {
    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      return res.status(400).json({
        message: 'Invalid quantity'
      });
    }

    const menu = menus.find((menu) => {
      return menu.id === item.menuId;
    });

    if (!menu) {
      return res.status(404).json({
        message: `Menu ${item.menuId} not found`
      });
    }
  }

  try {
    const cost = calculateOrderCost(items, deliveryOption);

    const order = createOrder(
      items,
      deliveryOption,
      cost
    );

    // orders.unshift(order);
    // saveOrders();

    insertOrder.run(
      order.id,
      order.orderTime,
      order.estimatedDeliveryTime,
      JSON.stringify(order.cost),
      JSON.stringify(order.products),
      order.deliveryOptionId
    );

    res.status(201).json(order);

  } catch (error) {
    next (error);
  }
});

// app.get('/api/orders', (req, res) => {
//   orders.forEach((order) => {
//     order.status = getOrderStatus(order);
//   });

//   res.json(orders);
// });

app.get('/api/orders', (req, res) => {
  const orders = getAllOrders.all();

  const parsedOrders = orders.map((order) => {
    return {
      ...order,
      cost: JSON.parse(order.cost),
      products: JSON.parse(order.products),
      status: getOrderStatus({
        ...order,
        cost: JSON.parse(order.cost),
        products: JSON.parse(order.products)
      })
    };
  });

  res.json(parsedOrders);
});

app.get('/api/orders/:id', (req, res) => {
  const orderId = req.params.id;

  // const order = orders.find((order) => {
  //   return order.id === orderId;
  // });
  const order = getOrderById.get(req.params.id);

  if (!order) {
    return res.status(404).json({
      message: 'Order not found'
    });
  }
  // order.status = getOrderStatus(order);
  const parsedOrder = {
    ...order,
    cost: JSON.parse(order.cost),
    products: JSON.parse(order.products)
  };

  parsedOrder.status = getOrderStatus(parsedOrder);

  res.json(parsedOrder);
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: 'Internal server error'
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});