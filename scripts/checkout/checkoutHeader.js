import {cart} from '../../data/cart-class.js';

export function renderCheckoutHeader() {
  const cartQuantity = cart.calculateCartQuantity();

  const checkoutHeaderHTML = `
    <div class="header-content">
      <div class="checkout-header-left-section">
        <a href="home.html">
          <h1 class="logo">hung.</h1>
        </a>
      </div>

      <div class="checkout-header-middle-section">
        Checkout (<a class="return-to-home-link js-return-to-home-link"
          href="home.html">${cartQuantity}</a>)
      </div>

      <div class="checkout-header-right-section">
      </div>
    </div>
  `;

  document.querySelector('.js-checkout-header')
  .innerHTML = checkoutHeaderHTML;
}