import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { cart } from '../../data/cart-class.js';
import formatPrice from '../utils/formatPrice.js';

export function renderPaymentSummary() {
  let priceCostCents = 0;
  let shippingCostCents = 0;

  cart.cartItems.forEach((cartItem) => {
    const matchingProduct = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    priceCostCents += matchingProduct.priceCents * cartItem.quantity;
    shippingCostCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = priceCostCents + shippingCostCents;
  const estimatedTaxCents = totalBeforeTaxCents * 0.1;
  const totalOrderCents = totalBeforeTaxCents + estimatedTaxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-container js-payment-summary-container">
      <div class="payment-summary-row">
        <div>Items (${cart.cartItems.length}):</div>
        <div class="payment-summary-money">
          $${formatPrice(priceCostCents)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping & handling:</div>
        <div class="payment-summary-money">
          $${formatPrice(shippingCostCents)}
        </div>
      </div>

      <div class="payment-summary-row sub-total-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money sub-total">
          $${formatPrice(totalBeforeTaxCents)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
          $${formatPrice(estimatedTaxCents)}
        </div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
          $${formatPrice(totalOrderCents)}
        </div>
      </div>
    </div>

    <div class="paypal-toggle">
      Use PayPal
      <input type="checkbox" class="paypal-toggle-checkbox">
    </div>
    <button class="place-order-btn primary-btn">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
};

export default renderPaymentSummary;