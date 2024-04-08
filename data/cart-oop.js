function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
  
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
    },
  
    updateQuantity(productId, newQuantity) {
      const matchingItem = this.getItem(productId);
      matchingItem.quantity = newQuantity;
      this.saveToLocalStorage();
    },
  
    removeItemFromCart(productId) {
      const newCart = this.cartItems.filter((cartItem) => cartItem.productId !== productId);
      this.cartItems = newCart;
      this.saveToLocalStorage();
    },
  
    calculateCartQuantity() {
      let cartQuantity = 0;
    
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
    
      return cartQuantity;
    },
  
    getItem(productId) {
      let matchingItem;
    
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      return matchingItem;
    },
  
    initializedCart() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [
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
    },
  
    saveToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  };

  return cart;
};

const cart = Cart('cart-oop');
const cartBusiness = Cart('cart-business');

cart.initializedCart();
cart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');

cartBusiness.initializedCart();

console.log(cart);
console.log(cartBusiness);