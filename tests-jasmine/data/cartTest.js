//Jasmine gives objects like .equals, .toBe, .toContain, .toBeTruthy, .toBeFalsy, .toBeDefined, .toBeUndefined, .toBeNull, .toBeNaN, .toMatch, .toThrow, etc. to compare values in tests.
//Use describe, first function is the name of the test suite, second function is the test suite itself. Use it to group related tests together.

//Test Coverage: Check all if conditions in the function are tested. For example, if there is an if statement with two branches, make sure to test both branches.

//If equality use expect(...).toEqual(...), if identity use expect(...).toBe(...). For example, if you want to check if two objects are equal, use toEqual. If you want to check if two variables point to the same object, use toBe.

//Flaky Tests: Tests that sometimes pass and sometimes fail. This can be caused by asynchronous code, random data, or dependencies on external services. To avoid flaky tests, make sure to mock dependencies and use deterministic data.

//For Flaky Test, we use Mocks and Spies. Mocks are objects that mimic the behavior of real objects. Spies are functions that record how they were called. Use mocks and spies to isolate the code being tested and to control the behavior of dependencies.

import { addToCart, cart, loadFromStorage } from '../../data/cart.js';

describe('test suite: addToCart', () => {
    it('adds an existing item to the cart', () => {
         spyOn(localStorage, 'setItem');
         spyOn(localStorage, 'getItem').and.callFake(() => {  return JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }]);
    });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    });

    it('adds a new item to the cart', () => {

        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {  return JSON.stringify([]);
    });

        loadFromStorage();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});