import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getMenu } from '../data/menus.js';
import formatCurrency from './utils/money.js';

function getOrderIdFromUrl() {
  const url = new URL(window.location.href);
  return url.searchParams.get('orderId');
}

function getStatus(step) {
  const statuses = ['Preparing', 'Shipping', 'Delivered'];
  return statuses[step] || 'Preparing';
}

async function renderTracking() {
  const orderId = getOrderIdFromUrl();

  // const response = await fetch(
  // `http://localhost:3000/api/orders/${orderId}`
  // );
  const response = await fetch(
    `https://bridges2-api.onrender.com/api/orders/${orderId}`
  );

  const order = await response.json();

  if (!response.ok) {
    document.querySelector('.js-tracking-container').innerHTML = `
      <div>${order.message}</div>
    `;
    return;
  }

  const orderTime = dayjs(order.orderTime)
    .format('DD MMM YYYY, HH:mm');
    
  const estimatedDeliveryTime = dayjs(order.estimatedDeliveryTime)
    .format('DD MMM YYYY, HH:mm');

  let itemsHTML = '';

  order.products.forEach(item => {
    const menu = getMenu(item.menuId);

    itemsHTML += `
      <div class="tracking-item">
        <img src="${menu.image}" class="tracking-image">

        <div class="tracking-info">
          <div>${menu.name}</div>
          <div>Qty: ${item.quantity}</div>
        </div>

        <div class="tracking-price">
          ฿${formatCurrency(menu.price * item.quantity)}
        </div>
      </div>
    `;
  });

  const statusStep = order.status;

  const html = `
    <div class="tracking-box">

      <div class="tracking-header">
        <h2>Order #${order.id}</h2>
        <div class="tracking-date">
          Placed on ${orderTime}
        </div>

        <div class="tracking-date">
          Estimated delivery: ${estimatedDeliveryTime}
        </div>

        <div class="tracking-total">
          Total: ฿${formatCurrency(order.cost.total)}
        </div>
      </div>

      <div class="tracking-status">
        <div class="step ${statusStep >= 0 ? 'active' : ''}">Preparing</div>
        <div class="step ${statusStep >= 1 ? 'active' : ''}">Shipping</div>
        <div class="step ${statusStep >= 2 ? 'active' : ''}">Delivered</div>
      </div>

      <div class="tracking-items">
        ${itemsHTML}
      </div>

    </div>
  `;

  document.querySelector('.js-tracking-container').innerHTML = html;
}

renderTracking();