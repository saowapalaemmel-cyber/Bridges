class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey){
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
  }

  addToCart(menuId, quantity){
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if(menuId === cartItem.menuId){
        matchingItem = cartItem;
      }
    });

    if(matchingItem) {
      matchingItem.quantity += quantity;
    }else {
      this.cartItems.push({
        menuId,
        quantity,
        // deliveryOptionId: 'standard'
      });
    }
    this.saveToStorage();
  }

  removeFromCart(menuId){
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.menuId !== menuId){
        newCart.push(cartItem);
      }
    });
    
    this.cartItems = newCart;

    this.saveToStorage();
  }

  // updateDeliveryOption(menuId, deliveryOptionId) {
  //   let matchingItem;

  //   this.cartItems.forEach((cartItem) => {
  //     if (menuId === cartItem.menuId){
  //       matchingItem = cartItem;
  //     }
  //   });

  //   matchingItem.deliveryOptionId = deliveryOptionId;

  //   this.saveToStorage();
  // }

  updateDeliveryOption(deliveryOptionId) {
    this.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
    }


  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

  updateQuantity(menuId,newQuantity){
    let matchingItem;
    
    this.cartItems.forEach((cartItem) => {
      if (menuId === cartItem.menuId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.quantity = newQuantity;

    this.saveToStorage();
  }

  resetCart() {
    this.cartItems = [];
    this.saveToStorage();
  }
}

export const cart = new Cart();