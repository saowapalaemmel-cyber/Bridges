const { menus } = require('../data/menus');
const crypto = require('crypto');

function getOrderStatus(order) {
  const orderTime = new Date(order.orderTime).getTime();
  const estimatedDeliveryTime = new Date(order.estimatedDeliveryTime).getTime();

  const currentTime = Date.now();

  const elapsedTime = currentTime - orderTime;
  const totalDeliveryTime = estimatedDeliveryTime - orderTime;

  if (elapsedTime < totalDeliveryTime / 2) {
    return 0;
  }

  if (elapsedTime < totalDeliveryTime) {
    return 1;
  }

  return 2;
}

function calculateOrderCost(items, deliveryOption) {
  let menuPrice = 0;

  for (const item of items) {
    const menu = menus.find((menu) => {
      return menu.id === item.menuId;
    });

    const itemTotal = menu.price * item.quantity;

    menuPrice += itemTotal;
  }

  const shippingPrice = deliveryOption.price;
  const totalBeforeTax = menuPrice + shippingPrice;
  const tax = totalBeforeTax * 0.1;
  const totalPrice = totalBeforeTax + tax;

  return {
    items: menuPrice,
    shipping: shippingPrice,
    tax,
    total: totalPrice
  };
}

function createOrder(items, deliveryOption, cost) {
  const orderTime = new Date();

  const order = {
    id: crypto.randomUUID()
      .replace(/-/g, '')
      .slice(0, 10),

    orderTime: orderTime.toISOString(),

    estimatedDeliveryTime: new Date(
      orderTime.getTime() + deliveryOption.deliveryTime * 60 * 1000
    ).toISOString(),

    cost,

    products: items.map((item) => ({
      menuId: item.menuId,
      quantity: item.quantity
    })),

    deliveryOptionId: deliveryOption.id
  };

  return order;
}

module.exports = {
  getOrderStatus,
  calculateOrderCost,
  createOrder
};