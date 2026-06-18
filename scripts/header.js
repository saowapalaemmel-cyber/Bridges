import { cart } from "../data/cart-class.js";

renderCheckoutHeader();

function renderCheckoutHeader() {
  const cartQuantity = cart.calculateCartQuantity();
  const headerHTML = `
    <div class="header-left-section">
      <a href="index.html">
        <h1 class="logo">Bridges</h1>
      </a>
    </div>

    <nav class="navbar">
      <a href="index.html">Home</a>
      <a href="#category">Menu</a>
      <a href="orders.html">Orders</a>
    </nav>

    <div class="header-middle-section">
      <input class="search-bar js-search-bar" type="text" placeholder="Search">

      <button class="search-button js-search-button">
        <img class="search-icon" src="images/icons/search-icon.png">
      </button>
    </div>

    <div class="header-right-section">
      <a class="cart-link" href="checkout.html">
        <img class="cart-icon" src="images/icons/cart-icon.png">
        <div class="cart-quantity js-cart-quantity">${cartQuantity}</div>
        <div class="cart-text">Cart</div>
      </a>
    </div>
  `;
  
  document.querySelector('.header')
    .innerHTML = headerHTML;

}