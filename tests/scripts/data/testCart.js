import { addToCart, cart, initializedCart, getItem } from '../../../data/cart.js';

describe('test suite: addToCart', () => {
  it('adds a new product', () => {
    spyOn(localStorage, 'setItem');
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    initializedCart();

    addToCart('e23b3vce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e23b3vce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });

  it('adds an existing product', () => {
    spyOn(localStorage, 'setItem');
    
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
    expect(cart[0].productId).toEqual('e23b3vce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });
});