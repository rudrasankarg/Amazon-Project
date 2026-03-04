import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';

export function renderPaymentSummary(){
    let productprice = 0;
    let shippingPrice = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productprice += product.price * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPrice += deliveryOption.price;
    });


    const totalPricebeforeTax = productprice + shippingPrice;
    const tax = totalPricebeforeTax * 0.18;
    const totalPrice = totalPricebeforeTax + tax;


    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">₹${productprice.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">₹${shippingPrice.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₹${totalPricebeforeTax.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (18%):</div>
            <div class="payment-summary-money">₹${tax.toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₹${totalPrice.toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>

    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}