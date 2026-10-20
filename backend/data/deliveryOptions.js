const deliveryOptions = [{
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

module.exports = { deliveryOptions };