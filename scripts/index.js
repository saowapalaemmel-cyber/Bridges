import { cart } from "../data/cart-class.js";
import { menus } from "../data/menus.js";

let selectedCategory = 'All';
const quantities = {};
const addedMessageTimeouts = {};


renderMenuGrid();

// Search Event
document.querySelector('.js-search-button')
  .addEventListener('click', () => {
    const search = document.querySelector('.js-search-bar').value;
    window.location.href = `index.html?search=${search}`
  });

document.querySelector('.js-search-bar')
  .addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
      const searchTerm = document.querySelector('.js-search-bar').value;
      window.location.href = `index.html?search=${searchTerm}`
    }
  });

// Category Event
document.querySelectorAll('.js-category-btn')
  .forEach(button => {
    button.addEventListener('click', () => {

      selectedCategory = button.dataset.category;

      document.querySelectorAll('.js-category-btn')
        .forEach(btn => btn.classList.remove('active'));

      button.classList.add('active');

      renderMenuGrid();
    });
  });

function renderMenuGrid() {
  let menuHTML = '';

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredMenus = menus;

  // Search filter
  if(search) {
    filteredMenus = menus.filter((menu) => {
      let matchingKeyword = false;

      menu.keywords.forEach((keyword) => {
        if(keyword.toLowerCase().includes(search.toLowerCase())){
          matchingKeyword = true;
        }
      });
      return matchingKeyword ||
        menu.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  // Category filter
  if (selectedCategory !== 'All') {
    filteredMenus = filteredMenus.filter(menu =>
      menu.category === selectedCategory
    );
  }

  filteredMenus.forEach((menu) => {
    menuHTML += `
      <div class="menu-container">
        <div class="menu-image-container">
          <img
            class="menu-image"
            src="${menu.image}"
            alt="${menu.name}">

          <img
            class="flag"
            src="${menu.country}">
        </div>

        <div class="menu-header">
          <div class="menu-name">${menu.name}</div>

          <div class="menu-price">
            ฿${menu.price}
          </div>
        </div>

        <div class="menu-description">
          ${menu.description}
        </div>

        <div class="menu-rating-container">
          <img class="menu-rating-stars"
            src="images/ratings/rating-${menu.rating.stars * 10}.png">
          <div class="menu-rating-count link-primary">
            ${menu.rating.count} reviews
          </div>
        </div>

        <div class="menu-quantity-container">
          <div class="quantity-control">
            <button class="quantity-btn js-decrease-btn" data-menu-id="${menu.id}">
              −
            </button>

            <span class="quantity-value js-quantity-${menu.id}">
              ${quantities[menu.id] || 1}
            </span>

            <button class="quantity-btn js-increase-btn" data-menu-id="${menu.id}">
              +
            </button>
          </div>
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-menu-id="${menu.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  document.querySelector('.js-menu-grid').innerHTML = menuHTML;

  updateCartQuantity();

  function updateCartQuantity() {
    const cartQuantity = cart.calculateCartQuantity();

    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }

  addMenuToCart();

  function addMenuToCart () {
    document.querySelectorAll('.js-add-to-cart')
      .forEach((button) => {
        button.addEventListener('click', () => {
          const {menuId} = button.dataset;
          // const quantitySelector = document.querySelector(`.js-quantity-selector-${menuId}`);
          // const quantity = Number(quantitySelector.value);
          const quantityElement = document.querySelector(
            `.js-quantity-${menuId}`);
          const quantity = Number(quantityElement.textContent);

          cart.addToCart(menuId,quantity);
          updateCartQuantity();
          displayAddedMessage(menuId);
        });
    })
  }

  function displayAddedMessage(menuId){
    // const addedMessage = document.querySelector(`.js-added-to-cart-${menuId}`);
    const button = document.querySelector(
      `.js-add-to-cart[data-menu-id="${menuId}"]`
    );

    button.innerHTML = `
      <img class="button-check-icon" src="images/icons/checkmark.png">
      Added
    `;
    button.classList.add('added');
    // addedMessage.classList.add('added-to-cart-visible');

    clearTimeout(addedMessageTimeouts[menuId]);

    addedMessageTimeouts[menuId] = setTimeout(() => {
      button.textContent = 'Add to Cart';
      button.classList.remove('added');
    }, 2000);
  }

  document.querySelectorAll('.js-increase-btn').forEach(button => {
    button.addEventListener('click', () => {
      const menuId = button.dataset.menuId;

      quantities[menuId] = (quantities[menuId] || 1) + 1;

      document.querySelector(
        `.js-quantity-${menuId}`
      ).textContent = quantities[menuId];
    });
  });

  document.querySelectorAll('.js-decrease-btn').forEach(button => {
    button.addEventListener('click', () => {
      const menuId = button.dataset.menuId;

      quantities[menuId] = Math.max(
        1,
        (quantities[menuId] || 1) - 1
      );

      document.querySelector(
        `.js-quantity-${menuId}`
      ).textContent = quantities[menuId];
    });
  });
  
}
