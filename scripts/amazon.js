import products from '../data/products.js';
import formatPrice from './utils/formatPrice.js';
import toggleHamburgerMenu from './shared/amazonHeader.js';

import { 
  addToCart, 
  calculateCartQuantity
} from '../data/cart.js';

renderProducts();
updateCartQuantity();
toggleHamburgerMenu();

function renderProducts() {
  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}" alt="product image">
        </div>

        <div class="product-name-container">
          <p class="product-name limit-text-to-2-lines">
            ${product.name}
          </p>
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsURL()}" alt="product rating stars">
          <div class="product-rating-count">${product.rating.count}</div>
        </div>

        <div class="product-price">${product.getPrice()}</div>
        
        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id} quantity-selector" name="quantity">
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
        
        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="js-added-to-cart-message-${product.id} added-to-cart-message">
          <img src="images/icons/checkmark.png" alt="checkmark icon">
          <div>Added</div>
        </div>
        
        <div class="add-to-cart-btn-container">
          <button class="js-add-to-cart-btn add-to-cart-btn primary-btn" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;
};

document.querySelectorAll('.js-add-to-cart-btn').forEach((button) => {
  let addedMessageTimeoutId;

  button.addEventListener('click', () => {
    const { productId } = button.dataset;
    const quantity = getItemQuantity(productId);

    addToCart(productId, quantity);
    updateCartQuantity();

    const previousTimeoutId = addedMessageTimeoutId

    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    const addedMessageElem = document.querySelector(`.js-added-to-cart-message-${productId}`);
    addedMessageElem.classList.add('add-to-cart-visible');

    const timeoutId = setTimeout(() => {
      addedMessageElem.classList.remove('add-to-cart-visible');
    }, 2000);

    addedMessageTimeoutId = timeoutId;
  });
});

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;

  document.querySelector('.js-cart-quantity-mobile')
    .innerHTML = cartQuantity;
};

function getItemQuantity(productId) {
  const selectElem = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(selectElem.value);

  return quantity;
}