import { 
  addToCart, 
  cart, 
  initializedCart, 
  removeItemFromCart } from '../../../data/cart.js';

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('adds a new product', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    initializedCart();

    addToCart('e23b3vce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    expect(cart[0].productId).toEqual('e23b3vce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });

  it('adds an existing product', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e23b3vce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: '1'
        }
      ]);
    });

    initializedCart();

    addToCart('e23b3vce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
    expect(cart[0].productId).toEqual('e23b3vce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });
});

describe('test suite: removeItemFromCart', () => {
  const productId1 = "e23b3vce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId3 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";

  beforeEach(() => {
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
  });

  it('remove a productId that is in the cart', () => {
    removeItemFromCart(productId1);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  it('remove a productId that\'s not in the cart', () => {
    removeItemFromCart(productId3);

    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[1].productId).toEqual(productId2);
  });
});