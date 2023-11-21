import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
  const cartQuantity = calculateCartQuantity();

  const checkoutHeaderHTML = `
      <div class="header-content">
        <div class="left-section">
          <a href="amazon.html">
            <img class="amazon-logo" src="images/amazon-logo.png" alt="amazon logo">
          </a>
        </div>
        <div class="middle-section">
          Checkout (
            <a class="return-to-home-link" href="amazon.html">${cartQuantity} items</a>
          )
        </div>
        <div class="right-section">
          <img src="images/icons/checkout-lock-icon.png" alt="checkout lock icon">
        </div>
      </div>
  `;

  document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHTML;
};

export default renderCheckoutHeader;