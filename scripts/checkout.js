import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentsummary.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';
import { loadProductsFetch } from "../data/products.js";
import { loadCart, cart } from "../data/cart.js";


function updateCheckoutItems() {
  let itemCount = 0;

  cart.forEach((cartItem) => {
    itemCount += cartItem.quantity;
  });

  const element = document.querySelector('.js-checkout-items');
  if (element) {
    element.innerHTML = `${itemCount} items`;
  }
}

async function loadPage(){
    try{
    await loadProductsFetch();
    await new Promise((resolve, reject) => {
        loadCart(() => {
            //reject();
            resolve();
        }
        );
    });

    } catch(error) {
    console.error('Error loading data:', error);
}
    renderOrderSummary();
    renderPaymentSummary();
    updateCheckoutItems();
}

loadPage();



/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        }
        );
    })
]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
}
);


*/
/*new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
}).then(() => {
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        }
        );
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});



/*
loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/