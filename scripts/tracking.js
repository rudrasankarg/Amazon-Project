import { orders } from '../data/order.js';
import { getProduct, loadProductsFetch } from '../data/products.js';

async function renderTracking() {

  await loadProductsFetch();

  const url = new URL(window.location.href);

  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  let matchingProduct;

  matchingOrder.products.forEach((product) => {
    if (product.productId === productId) {
      matchingProduct = product;
    }
  });

  const product = getProduct(productId);

  document.querySelector('.js-product-name').innerHTML = product.name;

  document.querySelector('.js-product-quantity').innerHTML =
    `Quantity: ${matchingProduct.quantity}`;

  document.querySelector('.js-product-image').src = product.image;

  const deliveryDate = new Date(matchingProduct.estimatedDeliveryTime);

  document.querySelector('.js-delivery-date').innerHTML =
    `Arriving on ${deliveryDate.toDateString()}`;

  const today = new Date();

  const timePercent =
    (today - new Date(matchingOrder.orderTime)) /
    (deliveryDate - new Date(matchingOrder.orderTime));

  let progress = Math.min(Math.max(timePercent, 0), 1);

  document.querySelector('.js-progress-bar').style.width =
    `${progress * 100}%`;

  if (progress < 0.33) {
    document.querySelector('.js-preparing-label')
      .classList.add('current-status');
  } else if (progress < 0.66) {
    document.querySelector('.js-shipped-label')
      .classList.add('current-status');
  } else {
    document.querySelector('.js-delivered-label')
      .classList.add('current-status');
  }

}

renderTracking();