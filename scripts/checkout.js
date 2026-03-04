import {cart, removeFromCart, updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';

hello();
const today = dayjs();
const deliveryDate = today.add(7, 'days').format('dddd, MMMM D');


let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const matchingProduct = products.find(
    (product) => product.id === cartItem.productId
  );

  if (!matchingProduct) {
    return;
  }


  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

    const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D');


  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${deliveryDate}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                ₹${matchingProduct.price}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionHTML(matchingProduct, cartItem)}
            </div>
        </div>
        </div>
  `;
});

function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = '';



    deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D');
        const priceString = deliveryOption.price === 0 ? 'FREE Shipping' : `₹${deliveryOption.price} - Shipping`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

       html += `
            <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${deliveryDate}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString}
                    </div>
                    </div>
                </div>

            `

    });

    return html;
}


document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();
    });
  });


document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
        });
    });