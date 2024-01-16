import { initializedCart, cart } from '../../../data/cart.js';
import { renderOrderSummary } from '../../../scripts/checkout/orderSummary.js';

describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e23b3vce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';

  beforeEach(() => {
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-checkout-header"></div>
      <div class="js-cart-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 3,
          deliveryOptionId: '1'
        },
        {
          productId: productId2,
          quantity: 2,
          deliveryOptionId: '2'
        }
      ]);
    });

    initializedCart();
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('displays the cart', () => {
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-container-${productId1}`)
        .innerText
    ).toContain('Quantity: 3');

    expect(
      document.querySelector(`.js-product-quantity-container-${productId2}`)
        .innerText
    ).toContain('Quantity: 2');
  });

  it('removes item from the cart', () => {
    document.querySelector(`.js-delete-quantity-link-${productId1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });
});