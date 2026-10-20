import { cart } from "../../data/cart-class.js";
import { getMenu } from "../../data/menus.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryTime } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderDeliveryOption() {
  const selectedDeliveryOptionId = cart.cartItems[0]?.deliveryOptionId || 'standard';

  cart.cartItems.forEach((cartItem) => {
    if (!cartItem.deliveryOptionId) {
      cartItem.deliveryOptionId = 'standard';
    }
  });

  cart.saveToStorage();

  const deliveryOption = getDeliveryOption (selectedDeliveryOptionId);
  const dateString = calculateDeliveryTime(deliveryOption);

  const deliveryOptionHTML = `
    <div class="delivery-time">
          Delivery time: ${dateString}
    </div>
    <div class="delivery-options-title">
      Choose a delivery option:
      ${deliveryOptionsHTML(selectedDeliveryOptionId)}
    </div>
  `;
  
  document.querySelector('.js-delivery-options')
    .innerHTML = deliveryOptionHTML;

  function deliveryOptionsHTML(selectedDeliveryOptionId) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const timeString = calculateDeliveryTime(deliveryOption);

      const priceString = deliveryOption.price === 0
        ? 'FREE'
        : `฿${formatCurrency(deliveryOption.price)} - `;

      const isChecked = deliveryOption.id === selectedDeliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option">
          <div>
            <div class="delivery-option-name">
              ${deliveryOption.name}
            </div>
            <div class="delivery-option-time">
              ${timeString} (${deliveryOption.deliveryTime} minutes)
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });
    return html;
  }

  document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const { deliveryOptionId } = element.dataset;

      // อัปเดตทุก item ใน cart
      cart.cartItems.forEach((cartItem) => {
        cartItem.deliveryOptionId = deliveryOptionId;
      });

      cart.saveToStorage();

      // render ใหม่
      renderDeliveryOption();
      renderPaymentSummary();
    });
  });

}