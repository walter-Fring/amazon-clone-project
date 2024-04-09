import { getProduct } from '../../data/products.js';

import { 
  deliveryOptions, 
  calculateDeliveryDate, 
  calculateShippingPrice,
  updateDeliveryOption,
  getDeliveryOption
} from '../../data/deliveryOptions.js';

import { 
  cart, 
  updateQuantity,
  removeItemFromCart 
} from '../../data/cart.js';

import formatPrice from '../utils/formatPrice.js';
import renderCheckoutHeader from './checkoutHeader.js';
import renderPaymentSummary from './paymentSummary.js';

export function renderOrderSummary() {
  let orderSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    const deliveryDate = calculateDeliveryDate(deliveryOption);

    orderSummaryHTML += `
      <div class="js-cart-item-container-${matchingProduct.id} cart-item-container
        js-cart-item-container">
        <div class="delivery-date">
          Delivery date:
          <span>${deliveryDate}</span>
        </div>
        <div class="cart-item-details-grid">
          <div class="product-image-container">
            <img class="product-image" src="${matchingProduct.image}" alt="product image">
          </div>
          <div class="product-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${matchingProduct.id}">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity-container
              js-product-quantity-container-${matchingProduct.id}">
              Quantity:
              <span class="quantity-label">${cartItem.quantity}</span>
              <input class="js-new-quantity-input-${productId} js-new-quantity-input new-quantity-input" type="number" value="${cartItem.quantity}" data-product-id="${matchingProduct.id}">
              <span class="js-save-quantity-link save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
              <span class="js-update-quantity-link update-quantity-link link-primary" data-product-id="${matchingProduct.id}">Update</span>
              <span class="js-delete-quantity-link js-delete-quantity-link-${matchingProduct.id} delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">Delete</span>
            </div>
          </div>
          <div class="js-delivery-options delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option
            </div>
            ${generateDeliveryOptions(cartItem, matchingProduct)}
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-cart-summary')
    .innerHTML = orderSummaryHTML;

  function generateDeliveryOptions(cartItem, matchingProduct) {
    let deliveryOptionsHTML = '';

    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = calculateDeliveryDate(deliveryOption);
      const shippingPrice = calculateShippingPrice(deliveryOption);
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      deliveryOptionsHTML += `
        <div class="js-delivery-option delivery-option
          js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input class="delivery-option-input
            js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}" type="radio" ${isChecked ? 'checked' : ''}>
          <div class="delivery-option-details">
            <div class="delivery-option-date">
              ${deliveryDate}
            </div>
            <div class="delivery-option-price">
              ${shippingPrice} Shipping
            </div>
          </div>
        </div>
      `;
    });

    return deliveryOptionsHTML;
  };

  document.querySelectorAll('.js-delivery-option').forEach((deliveryOption) => {
    deliveryOption.addEventListener('click', () => {
      const { productId, deliveryOptionId } = deliveryOption.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

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
      renderPaymentSummary();
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
    
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();

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