import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cart } from "../../data/cart-class.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getMenu } from "../../data/menus.js";
import { addOrder } from '../../data/orders.js';
import { formatCurrency } from "../utils/money.js";
import { createOrderFromCart } from "../../data/orders.js"


export function renderPaymentSummary() {
  let menuPrice = 0;
  let shippingPrice = 0;

  cart.cartItems.forEach((cartItem) => {
    const menu = getMenu(cartItem.menuId);
    menuPrice += menu.price * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    shippingPrice = deliveryOption.price;
  });

  const totalBeforeTax = menuPrice + shippingPrice;
  const tax = totalBeforeTax * 0.1;
  const totalPrice = totalBeforeTax + tax;

  let cartQuantity = cart.calculateCartQuantity();

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">฿${formatCurrency(menuPrice)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp;handling:</div>
      <div class="payment-summary-money js-payment-summary-shipping">฿${formatCurrency(shippingPrice)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">฿${formatCurrency(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">฿${formatCurrency(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-payment-summary-total">฿${formatCurrency(totalPrice)}</div>
    </div>

    <button class="place-order-button button-primary
      js-place-order">
      Place your order
    </button>
  `;
  
  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order')
  .addEventListener('click', () => {

    try {
      const order = createOrderFromCart(
        cart,
        menuPrice,
        shippingPrice,
        tax,
        totalPrice
      );

    addOrder(order);

    cart.resetCart();

    window.location.href = 'orders.html';

    }catch (error) {
      alert(error.message);
    }
  });
}
