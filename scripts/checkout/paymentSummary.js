import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';
import { addOrder } from '../../data/order.js'; 

export function renderPaymentSummary(){
    let productprice = 0;
    let shippingPrice = 0;
    let itemCount = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productprice += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPrice += deliveryOption.price;

        itemCount += cartItem.quantity;
    });

    const totalPricebeforeTax = productprice + shippingPrice;
    const tax = totalPricebeforeTax * 0.18;
    const totalPrice = totalPricebeforeTax + tax;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${itemCount}):</div>
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

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>

    `;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    document.querySelector('.js-place-order').addEventListener('click', async () => {
        try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },   
             body: JSON.stringify({
                cart: cart
            })
        }); 

        const order = await response.json();

              if (!order.errorMessage) {
              order.totalPrice = totalPrice;   // attach checkout total
              addOrder(order);

              localStorage.removeItem('cart');
              cart.length = 0;
            }
        } catch (error) {
            console.error('Error placing order');
        }

        window.location.href = 'orders.html';
    });
}