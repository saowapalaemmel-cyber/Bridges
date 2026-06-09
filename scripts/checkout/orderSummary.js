import { cart } from "../../data/cart-class.js";
import { getMenu } from "../../data/menus.js";
import { formatCurrency } from "../utils/money.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.cartItems.forEach((cartItem) => {
    const menuId = cartItem.menuId;

    let matchingMenu = getMenu(menuId);

    cartSummaryHTML += `
      <div class="cart-item-container
      js-cart-item-container
      js-cart-item-container-${matchingMenu.id}">
        <div class="cart-item-details-grid">
          <img class="menu-image"
            src="${matchingMenu.image}">

          <div class="cart-item-details">
            <div class="menu-name js-menu-name-${matchingMenu.id}">
              ${matchingMenu.name}
            </div>
            <div class="menu-price js-menu-price-${matchingMenu.id}">
              ฿${formatCurrency(matchingMenu.price)}
            </div>
            <div class="menu-quantity
              js-product-quantity-${matchingMenu.id}">
              <div class="item-actions-container">
                <div class="update-quantity-container">
                  <button class="quantity-btn js-minus-button"
                    data-menu-id="${matchingMenu.id}">−</button>
                  <span class="quantity-value">${cartItem.quantity}</span>
                  <button class="quantity-btn js-plus-button"
                    data-menu-id="${matchingMenu.id}">+</button>
                </div>

                <span class="update-quantity-link link-primary js-update-link" data-menu-id="${matchingMenu.id}">
                  Edit
                </span>

                <input class="quantity-input js-quantity-input-${matchingMenu.id}">
                <span class="link-primary save-quantity-link js-save-link" data-menu-id="${matchingMenu.id}">
                  Save
                </span>

                <span class="delete-quantity-link link-primary js-delete-link
                  js-delete-link-${matchingMenu.id}" data-menu-id="${matchingMenu.id}">
                  Delete
                </span>              
              </div>
            </div>
          </div>
        </div> 
      </div>
    `;
  });

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  //ลดจำนวนสินค้า
  document.querySelectorAll('.js-minus-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const menuId = button.dataset.menuId;
        const cartItem = cart.cartItems.find(item => item.menuId === menuId);

        if (!cartItem) return;

        const newQuantity = cartItem.quantity - 1;

        if (newQuantity > 0){
          cart.updateQuantity(menuId, newQuantity);
        }else {
          cart.removeFromCart(menuId);
        }
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
      });
    });

  //เพิ่มจำนวนสินค้า
  document.querySelectorAll('.js-plus-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const menuId = button.dataset.menuId;
        const cartItem = cart.cartItems.find(item => item.menuId === menuId);

        if (!cartItem) return;

        const newQuantity = cartItem.quantity + 1;

        cart.updateQuantity(menuId, newQuantity);

        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
      });
    });


  //Update link
  document.querySelectorAll('.js-update-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const menuId = link.dataset.menuId;
        
        const container = document.querySelector(
          `.js-cart-item-container-${menuId}`
        );
        container.classList.add('is-editing-quantity');
      });
    });

  //Save after update
  document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
      const menuId = link.dataset.menuId ;

      const quantityInput = document.querySelector(
        `.js-quantity-input-${menuId}`
      );
      const newQuantity = Number(quantityInput.value);

      if (newQuantity < 0 || newQuantity >= 1000){
        alert('Quantity must be at least 0 and less than 1000');
        return;
      }
      cart.updateQuantity(menuId,newQuantity);

      const container = document.querySelector(
        `.js-cart-item-container-${menuId}`
      );
      container.classList.remove('is-editing-quantity');

      const quantityLabel = document.querySelector(
        `.js-quantity-label-${menuId}`
      );

      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
      });
    });

  //Delete link
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const menuId = link.dataset.menuId;
        cart.removeFromCart(menuId);

        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}