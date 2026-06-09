import { cart } from "../data/cart-class.js";
import { menus } from "../data/menus.js";

renderMenuGrid();

function renderMenuGrid() {
  let menuHTML = '';

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredMenus = menus;

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


  filteredMenus.forEach((menu) => {
    menuHTML += `
      <div class="menu-container">
        <div class="menu-image-container">
          <img
            class="menu-image"
            src="${menu.image}"
            alt="${menu.name}">
        </div>
        <div class="menu-name">${menu.name}</div>

        <div class="menu-rating-container">
          <img class="menu-rating-stars"
            src="images/ratings/rating-${menu.rating.stars * 10}.png">
          <div class="menu-rating-count link-primary">
            ${menu.rating.count}
          </div>
        </div>

        <div class="menu-price">
          ฿${menu.price}
        </div>

        <div class="menu-quantity-container">
          <select class="quantity-selector js-quantity-selector-${menu.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="menu-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${menu.id}" >
          <img src="images/icons/checkmark.png">
          Added
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
          const quantitySelector = document.querySelector(`.js-quantity-selector-${menuId}`);
          const quantity = Number(quantitySelector.value);

          cart.addToCart(menuId,quantity);
          updateCartQuantity();
          displayAddedMessage(menuId);
        });
    })
  }

  const addedMessageTimeouts = {};
  function displayAddedMessage(menuId){
    const addedMessage = document.querySelector(`.js-added-to-cart-${menuId}`);

    addedMessage.classList.add('added-to-cart-visible');

    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visible');
    }, 2000);

    addedMessageTimeouts[menuId] = timeoutId;
  }

  document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `home.html?search=${search}`
    });

  document.querySelector('.js-search-bar')
    .addEventListener('keydown', (event) => {
      if(event.key === 'Enter') {
        const searchTerm = document.querySelector('.js-search-bar').value;
        window.location.href = `home.html?search=${searchTerm}`
      }
    });
}
