import { getProduct } from '../../data/products.js';
import formatCurrency from '../utils/formatCurrency.js';
import renderCheckoutHeader from './checkoutHeader.js';
import { 
  cart, 
  updateQuantity,
  removeItemFromCart 
} from '../../data/cart.js';

export function renderOrderSummary() {
  let orderSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    orderSummaryHTML += `
      <div class="js-cart-item-container-${matchingProduct.id} cart-item-container">
        <div class="delivery-date">
          Delivery date:
          <span>Tuesday, November 14</span>
        </div>
        <div class="cart-item-details-grid">
          <div class="product-image-container">
            <img class="product-image" src="${matchingProduct.image}" alt="product image">
          </div>
          <div class="product-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity-container">
              Quantity:
              <span class="quantity-label">${cartItem.quantity}</span>
              <input class="js-new-quantity-input-${productId} js-new-quantity-input new-quantity-input" type="number" value="${cartItem.quantity}" data-product-id="${matchingProduct.id}">
              <span class="js-save-quantity-link save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
              <span class="js-update-quantity-link update-quantity-link link-primary" data-product-id="${matchingProduct.id}">Update</span>
              <span class="js-delete-quantity-link delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">Delete</span>
            </div>
          </div>
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option
            </div>
            <div class="delivery-option">
              <input class="delivery-option-input" type="radio">
              <div class="delivery-option-details">
                <div class="delivery-option-date">
                  Wednesday, November 22
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input class="delivery-option-input" type="radio">
              <div class="delivery-option-details">
                <div class="delivery-option-date">
                  Thursday, November 16
                </div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input class="delivery-option-input" type="radio" checked>
              <div class="delivery-option-details">
                <div class="delivery-option-date">
                  Tuesday, November 14
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-cart-summary')
    .innerHTML = orderSummaryHTML;

  document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) => {
    updateLink.addEventListener('click', () => {
      const { productId } = updateLink.dataset;

      const cartItemContainer = getItemContainer(productId);
      cartItemContainer.classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.js-save-quantity-link').forEach((saveLink) => {
    saveLink.addEventListener('click', () => {
      const { productId } = saveLink.dataset;
      saveQuantity(productId);
    });
  });

  document.querySelectorAll('.js-delete-quantity-link').forEach((deleteLink) => {
    deleteLink.addEventListener('click', () => {
      const { productId } = deleteLink.dataset;
      removeItemFromCart(productId);
      renderCheckoutHeader();
      renderOrderSummary();
    });
  });

  document.querySelectorAll('.js-new-quantity-input').forEach((quantityInput) => {
    quantityInput.addEventListener('keydown', (event) => {
      const { productId } = quantityInput.dataset;
      handleQuantityInput(event, productId);
    });
  });

  function saveQuantity(productId) {
    const newQuantity = getNewQuantity(productId)

    if (newQuantity <= 0 || newQuantity >= 1000) {
      alert('Quantity must be at least 0 and less than 1000');
      return;
    }

    updateQuantity(productId, newQuantity);
    renderOrderSummary();
    renderCheckoutHeader();

    const cartItemContainer = getItemContainer(productId);
    cartItemContainer.classList.remove('is-editing-quantity');
  };

  function handleQuantityInput(event, productId) {
    if (event.key === 'Enter') {
      saveQuantity(productId);
    }
  };

  function getItemContainer(productId) {
    const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    return cartItemContainer;
  };

  function getNewQuantity(productId) {
    const newQuantityInput = document.querySelector(`.js-new-quantity-input-${productId}`);
    const newQuantity = Number(newQuantityInput.value);
    return newQuantity;
  };
};

export default renderOrderSummary;