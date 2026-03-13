//1. Generate HTML for products
//2. Add event listeners to Add to Cart buttons
//3. Add selected quantity to cart
//4. Update cart quantity in header

import { cart, addToCart } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { updateCartQuantity } from './utils/cartQuantity.js';


updateCartQuantity();


loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">

        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-${product.id}" style="opacity:0;">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
          Add to Cart
        </button>

      </div>
    `;
  });

  document.querySelector('.js-products-grid').innerHTML = productsHTML;


  updateCartQuantity();

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {

        const productId = button.dataset.productId;

        const quantitySelector = document.querySelector(
          `.js-quantity-selector-${productId}`
        );

        const quantity = Number(quantitySelector.value);

        addToCart(productId, quantity);

        updateCartQuantity();


        const cartIcon = document.querySelector('.js-cart-icon');

        if (cartIcon) {
          cartIcon.classList.add('cart-icon-animate');

          setTimeout(() => {
            cartIcon.classList.remove('cart-icon-animate');
          }, 400);
        }


        quantitySelector.value = 1;

        const addedMessage = document.querySelector(`.js-added-${productId}`);
        addedMessage.style.opacity = 1;

        setTimeout(() => {
          addedMessage.style.opacity = 0;
        }, 2000);

      });
    });
}
