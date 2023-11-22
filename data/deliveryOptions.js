import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import formatCurrency from '../scripts/utils/formatCurrency.js';
import { getItem, saveToLocalStorage } from './cart.js';

export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
];

function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  const deliveryDays = deliveryOption.deliveryDays;
  
  let remainingDays = deliveryDays;
  let deliveryDate = today;

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  const dateString = deliveryDate.format('dddd, MMMM D');
  return dateString;
};

export function calculateShippingPrice(deliveryOption) {
  const priceCents = deliveryOption.priceCents;
  const shippingPrice = (priceCents === 0) ? 'Free' : `$${formatCurrency(priceCents)}`;

  return shippingPrice;
};

export function updateDeliveryOption(productId, deliveryOptionId) {
  const matchingItem = getItem(productId);
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToLocalStorage();
};

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (deliveryOptionId === option.id) {
      deliveryOption = option;
    }
  });

  return deliveryOption;
}

export default deliveryOptions;