export const cart = initializedCart();

export default cart;

export function addToCart(productId) {
  const selectElem = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(selectElem.value);

  const matchingItem = getItem(productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity
    });
  }

  saveToLocalStorage();
};

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
};

function getItem(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.id) {
      matchingItem = cartItem;
    }
  });

  return matchingItem;
};

function initializedCart() {
  return JSON.parse(localStorage.getItem('cart')) || [
    {
      productId: "e23b3vce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 3
    },
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2
    }
  ];
}

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
};