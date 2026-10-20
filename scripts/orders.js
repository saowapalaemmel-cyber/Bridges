import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cart } from "../data/cart-class.js";
import { getMenu } from '../data/menus.js';
import formatCurrency from './utils/money.js';

async function loadPage() {
  const response = await fetch('http://localhost:3000/api/orders');
  const orders = await response.json();

  let ordersHTML = '';

  orders.forEach((order) => {
    const orderTimeString = dayjs(order.orderTime)
      .format('DD MMM YYYY, HH:mm');
    const estimatedDeliveryTimeString = dayjs(order.estimatedDeliveryTime)
      .format('DD MMM YYYY, HH:mm');

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="parcel-icon">
              <img class="parcel-image" src="images/icons/parcel.png">
            </div>
            <div class="order-info">
              <div class="order-id">Order #${order.id} </div>
              <div class="order-date">
                Placed on ${orderTimeString}
              </div>
              <div class="order-date">
                Estimated delivery: ${estimatedDeliveryTimeString}
              </div>
            </div>
            <div class="order-total-info">
              <div class="order-total-label">Total</div>
              <div class="order-total">฿${formatCurrency(order.cost.total)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <a href="tracking.html?orderId=${order.id}">
              <button class="track-package-button button-secondary">
                Track Order
              </button>
            </a>
          </div>
        </div>
        <div class="order-details-grid">
          ${menuListHTML(order)}
        </div>
      </div>
    `;
  });

  function menuListHTML(order) {
    let menuListHTML = '';

    order.products.forEach((menuDetails) => {
      const menu = getMenu(menuDetails.menuId);

      menuListHTML += `
        <div class="menu-image-container">
          <img src="${menu.image}">
        </div>
        <div class="product-details">
          <div class="menu-name">
            ${menu.name}
          </div>
          <div class="menu-quantity">
            Quantity: ${menuDetails.quantity}
          </div>
        </div>
        <div class="buy-again-container">
          <button class="buy-again-button button-primary js-buy-again"
            data-menu-id="${menu.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
      `;
    });

    return menuListHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      const menuId = button.dataset.menuId;
      cart.addToCart(menuId, 1);

      button.innerHTML = 'Added';

      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);

      const cartQuantity = cart.calculateCartQuantity();
      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
    });
  });

  const cartQuantity = cart.calculateCartQuantity();
  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;

}

loadPage();