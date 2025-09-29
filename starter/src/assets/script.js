/** Images provided in /images folder. All images from Unsplash.com by Mae Mu & Allec Gomes. */

/** Function to create a new product object */
function makeProduct({ name, price, productId, image }) {
  return {
    name,
    price,
    quantity: 0, 
    productId,
    image
  };
}

/** Array containing the defined product catalog */
const products = [
  makeProduct({
    name: 'Carton of Cherries',
    price: 4,
    productId: 1,
    image: './images/cherry.jpg'
  }),
  makeProduct({
    name: 'Carton of Strawberries',
    price: 5,
    productId: 2,
    image: './images/strawberry.jpg'
  }),
  makeProduct({
    name: 'Bag of Oranges',
    price: 10,
    productId: 3,
    image: './images/orange.jpg'
})
];


/** Array that holds the product objects currently added to the shopping cart */
const cart = [];

/** Helper function to find a product by its unique ID */
function getProductById(productId) {
  return products.find(item => item.productId === productId);
}

/** Helper function to retrieve a specific product object currently in the cart by its ID. */
function getCartItemById(productId) {
  return cart.find(item => item.productId === productId);
}


/** Adds a product to the shopping cart */
function addProductToCart(productId) {
  const product = getProductById(productId);

  
  if (!product) {
    return false; 
  } 

  product.quantity += 1;

  const cartItem = getCartItemById(productId);

  if (!cartItem) {
    cart.push(product); 
  }
  return true; 
}

/** Increases the quantity of a product in the shopping cart by 1 */
function increaseQuantity(productId) {
  const cartItem = getCartItemById(productId);
  
  if (!cartItem) {
    return false; 
  }
    cartItem.quantity += 1; 
    return true; 
}


/** Decreases the quantity of a product in the shopping cart by 1 */
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

/** Removes a product completely from the shopping cart */
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

/** Calculates the total cost of all items in the shopping cart */
function cartTotal() {
  let total = 0; 
  for (let i = 0; i < cart.length; i++) {  
    let itemTotal = cart[i].price * cart[i].quantity; 
    total += itemTotal;
  }
  return total;
}

/** Empties the shopping cart and resets product quantities */
function emptyCart() {
  for (let i = 0; i < products.length; i++) {  
    products[i].quantity = 0; 
  }
  cart.length = 0; 
}

/** Global variable */
let remainingBalance = 0;

/** Processes a payment for the total amount in the cart */
function pay(amount) {
  const transactionDifference = amount - cartTotal();
  if (transactionDifference >= 0) {
        emptyCart();
remainingBalance = transactionDifference;
  } else { 
remainingBalance = transactionDifference; 
  }
  return transactionDifference;
}

/** Currency conversion rates */
const rates = {
  USD: 1, // base
  EUR: 0.85, // 1 USD = 0.85 EUR
  GBP: 0.75, // 1 USD = 0.75 GBP
  JPY: 110 // 1 USD = 110 JPY
};

/** Converts a given amount from USD to a specified currency */
function convertCurrency(amount, currency) {
 
  if (!rates[currency]) {
    return null;
  }
  const converted = amount * rates[currency];
  return converted.toFixed(2); 
} 

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
   
  
   


