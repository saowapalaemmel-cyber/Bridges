import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cart } from "../data/cart-class.js";
import { getMenu } from '../data/menus.js';
import { orders } from '../data/orders.js';
import formatCurrency from './utils/money.js';

function loadPage() {
  let ordersHTML = '';

  orders.forEach((order) => {
    const orderTimeString = dayjs(order.orderTime).format('DD MMM, HH:mm');

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.cost.total)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
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
          <div class="menu-delivery-date">
            Arriving on: ${
              dayjs(menuDetails.estimatedDeliveryTime).format('HH:mm')
            }
          </div>
          <div class="menu-quantity">
            Quantity: ${menuDetails.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again"
            data-menu-id="${menu.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${menu.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
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

      const cartQuantity = calculateCartQuantity();
      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;
    });
  });

  const cartQuantity = cart.calculateCartQuantity();
  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

loadPage();