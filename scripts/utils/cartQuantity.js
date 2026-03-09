import { cart } from '../../data/cart.js';

export function updateCartQuantity() {

let cartQuantity = 0;

cart.forEach((cartItem) => {
cartQuantity += cartItem.quantity;
});

const cartElement = document.querySelector('.js-cart-quantity');

if(cartElement){
cartElement.innerHTML = cartQuantity;
}

}