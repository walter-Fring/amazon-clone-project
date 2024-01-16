import formatPrice from '../../scripts/utils/formatPrice.js';

function testFormatPrice(price, testCase, caseName) {
  console.log(caseName);

  if (formatPrice(price) === testCase) {
    console.log('passed');
  } else {
    console.log('failed');
  }
}

testFormatPrice(2095, '20.95', 'converts cents into dollars');
testFormatPrice(0, '0.00', 'works with 0');
testFormatPrice(2000.5, '20.01', 'rounds up to the nearest cent');
testFormatPrice(2000.4, '20.00', 'rounds down to the nearest cent');
testFormatPrice(-2095, '-20.95', 'works with negative numbers')