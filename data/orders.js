import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function createOrderFromCart(cart, menuPrice, shippingPrice, tax, totalPrice) {

  if (!cart.cartItems || cart.cartItems.length === 0) {
    throw new Error('Cannot create order from empty cart');
  }

  return {
    id: crypto.randomUUID()
      .replace(/-/g, '')
      .slice(0, 10),

    orderTime: new Date().toISOString(),

    cost: {
      items: menuPrice,
      shipping: shippingPrice,
      tax,
      total: totalPrice
    },

    products: cart.cartItems.map((item) => ({
      menuId: item.menuId,
      quantity: item.quantity,
      estimatedDeliveryTime: dayjs()
        .add(1, 'day')
        .toISOString()
    }))
  };
}

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  if (!order.products || order.products.length === 0) {
    throw new Error('Cannot create order with empty products.');
  }
  orders.unshift(order);
  saveToStorage();
}  

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}