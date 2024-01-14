import { addToCart, cart, initializedCart } from '../../../data/cart.js';

describe('test suite: addToCart', () => {
  it('adds a new product', () => {
    spyOn(localStorage, 'setItem');
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    initializedCart();

    addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');

    expect(cart.length).toEqual(1);
  });
});