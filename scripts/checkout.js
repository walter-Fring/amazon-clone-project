import renderCheckoutHeader from './checkout/checkoutHeader.js';
import renderOrderSummary from './checkout/orderSummary.js';
import renderPaymentSummary from './checkout/paymentSummary.js';

renderCheckoutPage();

export function renderCheckoutPage() {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

export default renderCheckoutPage;