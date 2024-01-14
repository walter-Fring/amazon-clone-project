import formatPrice from '../scripts/utils/formatPrice.js';

describe('test suite: formatPrice', () => {
  it('converts cents into dollars', () => {
    expect(formatPrice(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatPrice(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(formatPrice(2000.5)).toEqual('20.01');
  });

  it('rounds down to the nearest cent', () => {
    expect(formatPrice(2000.4)).toEqual('20.00');
  });
});