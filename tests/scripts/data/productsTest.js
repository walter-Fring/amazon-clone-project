import {
  Product,
  Clothing,
  Appliance
} from '../../../data/products.js';

describe('Test suite: Product', () => {
  let product;

  beforeEach(() => {
    product = new Product({
      id: "e23b3vce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/umbrella.jpg",
      name: "Dark Mamba Umbrella",
      rating: {
        stars: 4.0,
        count: 57
      },
      priceCents: 1041,
      keywords: [
        "umbrella",
      ]
    });
  });

  it('has the correct properties', () => {
    expect(product.id).toEqual('e23b3vce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product.name).toEqual('Dark Mamba Umbrella');
  });

  it('gets the stars URL', () => {
    expect(product.getStarsURL()).toEqual('images/ratings/rating-40.png');
  });

  it('gets the price', () => {
    expect(product.getPrice()).toEqual('$10.41');
  });

  it('does not display any extra info', () => {
    expect(product.extraInfoHTML()).toEqual('');
  });
});

describe('Test suite: Clothing', () => {
  let product;

  beforeEach(() => {
    product = new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    });
  });

  it('has the correct properties', () => {
    expect(product.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(product.name).toEqual('Adults Plain Cotton T-Shirt - 2 Pack');
  });

  it('gets the stars URL', () => {
    expect(product.getStarsURL()).toEqual('images/ratings/rating-45.png');
  });

  it('gets the price', () => {
    expect(product.getPrice()).toEqual('$7.99');
  });

  it('display a size chart link in extraInfoHTML', () => {
    expect(product.extraInfoHTML()).toContain(
      `<a href="images/clothing-size-chart.png" target="_blank">`
    )

    expect(product.extraInfoHTML()).toContain('Size Chart');
  });
});

describe('Test suite: Appliance', () => {
  let product;

  beforeEach(() => {
    product = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type: "appliance",
      instructionLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png"
    });
  });

  it('has the correct properties', () => {
    expect(product.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(product.name).toEqual('2 Slot Toaster - Black');
  });

  it('gets the stars URL', () => {
    expect(product.getStarsURL()).toEqual('images/ratings/rating-50.png');
  });

  it('gets the price', () => {
    expect(product.getPrice()).toEqual('$18.99');
  });

  it('displays instructions and warranty in extraInfoHTML', () => {
    expect(product.extraInfoHTML()).toContain(
      `<a href="images/appliance-instructions.png" target="_blank">`
    )

    expect(product.extraInfoHTML()).toContain('Instructions');

    expect(product.extraInfoHTML()).toContain(
      `<a href="images/appliance-warranty.png" target="_blank">`
    )

    expect(product.extraInfoHTML()).toContain('Warranty');
  });
});