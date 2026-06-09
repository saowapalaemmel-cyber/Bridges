import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
  id: 'pickup',
  name: 'Pickup',
  deliveryTime: 0,
  price: 0
},
{
  id: 'standard',
  name: 'Standard Delivery',
  deliveryTime: 60,
  price: 0
},
{
  id: 'express',
  name: 'Express Delivery',
  deliveryTime: 30,
  price: 29
},
{
  id: 'priority',
  name: 'Priority Delivery',
  deliveryTime: 15,
  price: 59
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryTime(deliveryOption) {
  let deliveryTime = dayjs()
  .add(deliveryOption.deliveryTime, 'minute');

  const timeString = deliveryTime.format('HH:mm');
  return timeString;
}
