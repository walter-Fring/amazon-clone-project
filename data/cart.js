export let cart;

initializedCart()

export function addToCart(productId) {
  const selectElem = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(selectElem.value);

  const matchingItem = getItem(productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }

  saveToLocalStorage();
};

export function updateQuantity(productId, newQuantity) {
  const matchingItem = getItem(productId);
  matchingItem.quantity = newQuantity;
  saveToLocalStorage();
};

export function removeItemFromCart(productId) {
  const newCart = cart.filter((cartItem) => cartItem.productId !== productId);
  cart = newCart;
  saveToLocalStorage();
};

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
};

export function getItem(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  return matchingItem;
};

export function initializedCart() {
  cart = JSON.parse(localStorage.getItem('cart')) || [
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
};

export function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
};