/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */

/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

//MY PRODUCTS/ARRAY
const products = [
  {
    name: 'Carton of Cherries',
    price: 4,
    quantity: 0,
    productId: 1,
    image: './images/cherry.jpg'
  },
  {
    name: 'Carton of Strawberries',
    price: 5,
    quantity: 0,
    productId: 2,
    image: './images/strawberry.jpg'
  },
  {
    name: 'Bag of Oranges',
    price: 10,
    quantity: 0,
    productId: 3,
    image: './images/orange.jpg'
}
];



/* Declare an empty array named cart to hold the items in the cart */

const cart = [];

/*Helper function */
function getProductById(productId) {
  return products.find(item => item.productId === productId);
}

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/

/**
 * Adds a product to the shopping cart.
 *
 * Searches for a product by its ID in the `products` array.
 * - If the product exists and is already in the cart, its quantity is increased by 1.
 * - If the product exists but is not in the cart, it is added with an initial quantity of 1.
 * - If the product does not exist, the function returns false.
 */
function addProductToCart(productId) {
  const product = getProductById(productId);

  
  if (!product) {
    return false; 
  } 

  product.quantity += 1;

  const cartItem = cart.find(item => item.productId === productId);

  if (!cartItem) {
    cart.push(product); 
  }
  return true; 
}

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

/**
 * Increases the quantity of a product in the shopping cart by 1.
 *
 * Searches for the product in the cart by its productId.
 * - If the product exists in the cart, its quantity is incremented by 1.
 * - If the product does not exist in the cart, the function returns false.
 */

function increaseQuantity(productId) {
  const cartItem = cart.find(item => item.productId === productId);
  if (!cartItem) {
    return false; 
  }
    cartItem.quantity += 1; 
    return true; 
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/
/**
 * Decreases the quantity of a product in the shopping cart by 1.
 *
 * Searches for the product in the cart by its productId.
 * - If the product exists, its quantity is decreased by 1.
 * - If the quantity becomes 0, the product is removed from the cart.
 * - If the product is not found in the cart, returns false.
 */

function decreaseQuantity(productId) {
  const cartItemIndex = cart.findIndex(item => item.productId === productId);
 
  if (cartItemIndex === -1) {
  return false;
  }

  const cartItem = cart[cartItemIndex]; 
  cartItem.quantity -= 1; 
  if (cartItem.quantity === 0) {
    cart.splice(cartItemIndex, 1);
  }
  return true; 
}


/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/
/**
 * Removes a product completely from the shopping cart.
 *
 * Searches for the product in the cart by its productId.
 * - If the product is found, it resets the product's quantity to 0 
 *   and removes it from the cart.
 * - If the product is not found in the cart, returns false.
 */

function removeProductFromCart(productId) {
  const cartItemIndex = cart.findIndex(item => item.productId === productId);
  if (cartItemIndex === -1) {
    return false; 
  }

  const product = getProductById(productId);
  if (product) {
    product.quantity = 0;
  }
  cart.splice(cartItemIndex, 1);
  return true; 
}



/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/
/**
 * Calculates the total cost of all items in the shopping cart.
 *
 * Iterates through the `cart` array, multiplying each item's price
 * by its quantity to determine the total cost. The sum of all
 * products' totals is returned.
 */
function cartTotal() {
  let total = 0; 
  for (let i = 0; i < cart.length; i++) {  
    let itemTotal = cart[i].price * cart[i].quantity; 
    total += itemTotal;
  }
  return total;
}


/* Create a function called emptyCart that empties the products from the cart */
/**
 * Empties the shopping cart and resets product quantities.
 *
 * This function sets the quantity of all products in the `products` array to 0
 * and clears the `cart` array, effectively removing all items from the cart.
 */

function emptyCart() {
  for (let i = 0; i < products.length; i++) {  
    products[i].quantity = 0; 
  }
  cart.length = 0; 
}

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/
/**
 * Processes a payment for the total amount in the cart.
 *
 * Adds the given payment amount to the running total (`totalAmountPaid`),
 * then calculates the remaining balance by subtracting the cart total.
 * If the remaining balance is zero or positive, the total paid is reset for
 * the next transaction.
 */



function pay(amount) {
  let remainingBalance = amount - cartTotal(); 
    if (remainingBalance >= 0) {
  emptyCart(); 
  }
  return remainingBalance; 

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/

const rates = {
  USD: 1, // base
  EUR: 0.85, // 1 USD = 0.85 EUR
  GBP: 0.75, // 1 USD = 0.75 GBP
  JPY: 110 // 1 USD = 110 JPY
};

/** Converts a given amount from USD to a specified currency. */

function convertCurrency(amount, currency) {

  if (!rates[currency]) {
    console.log('Currency not supported');
    return null;
  }
  const converted = amount * rates[currency];
  return converted.toFixed(2); 
}


/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
   products,
   cart,
   addProductToCart,
   increaseQuantity,
   decreaseQuantity,
   removeProductFromCart,
   cartTotal,
   pay, 
   emptyCart,
  }
   
  
   


