class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#initializedCart();
  }

  addToCart(productId, quantity=1) {
    const matchingItem = this.getItem(productId);
  
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
    }
  
    this.saveToLocalStorage();
  }

  updateQuantity(productId, newQuantity) {
    const matchingItem = this.getItem(productId);
    matchingItem.quantity = newQuantity;
    this.saveToLocalStorage();
  }

  removeItemFromCart(productId) {
    const newCart = this.cartItems.filter((cartItem) => cartItem.productId !== productId);
    this.cartItems = newCart;
    this.saveToLocalStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
  
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    return cartQuantity;
  }

  getItem(productId) {
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    return matchingItem;
  }

  #initializedCart() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
      {
        productId: "e23b3vce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 3,
        deliveryOptionId: '1'
      },
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '2'
      }
    ];
  }

  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }
};

export const cart = new Cart('cart-oop');