const cartItemsContainer = document.getElementById('cart-items-container');
const cartCount = document.getElementById('cart-count');
const totalBillElement = document.getElementById('total-bill'); // Element to display the total bill
let cartItems = [];

// Function to update the cart UI
function updateCartUI() {
    cartItemsContainer.innerHTML = ''; // Clear current items
    let totalAmount = 0;

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(cartItem);

        // Calculate total amount for the bill
        totalAmount += item.price * item.quantity;
    });

    cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0); // Update cart count

    // Display the total bill amount
    totalBillElement.textContent = `Total: $${totalAmount.toFixed(2)}`;
}

// Adding event listeners to product buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productItem = button.parentElement.parentElement; // Get the product item
        const productName = productItem.querySelector('h3').textContent;
        const productPrice = productItem.querySelector('p').textContent.replace('$', '').trim();

        console.log('Adding to cart:', productName, productPrice); // Debugging

        // Check if the item already exists in the cart
        const existingItemIndex = cartItems.findIndex(item => item.name === productName);
        if (existingItemIndex !== -1) {
            // Increase the quantity of the existing item
            cartItems[existingItemIndex].quantity += 1;
        } else {
            // Add new item to the cart array
            cartItems.push({ name: productName, price: parseFloat(productPrice), quantity: 1 });
        }

        // Log the cart to see the current state
        console.log('Current cart:', cartItems);

        // Update the cart UI
        updateCartUI();
    });
});
