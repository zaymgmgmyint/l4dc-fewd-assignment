
// Initialize or update the cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  const cartCountElement = document.getElementById("cart-count");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.innerText = cartCount;
});

// Function to add items to the cart
function addToCart(itemName, itemPrice) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.getElementById("cart-count");

  // Check if the item already exists in the cart
  const existingItemIndex = cart.findIndex((item) => item.name === itemName);
  if (existingItemIndex > -1) {
    // If it exists, increment its quantity
    cart[existingItemIndex].quantity++;
  } else {
    // If it doesn't exist, add it to the cart
    cart.push({
      name: itemName,
      quantity: 1,
      price: itemPrice,
    });
  }

  // Save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the cart count badge
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.innerText = cartCount;

  // Show success alert
  Swal.fire({
    icon: "success",
    title: "Item Added to Cart",
    text: `${itemName} has been successfully added to your cart!`,
    showConfirmButton: false,
    timer: 1500,
  });

  console.log(`${itemName} added to cart`);
}

// Function to get all cart items
function getCartItems() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Populate Cart on Page Load
document.addEventListener("DOMContentLoaded", () => {
  populateCart();
});

// Function to populate the cart on page load
function populateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const cartCountElement = document.getElementById("cart-count");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.quantity * item.price;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${itemTotal.toFixed(2)}</td>
      `;
    cartItemsContainer.appendChild(row);
  });

  cartTotalElement.textContent = `$${total.toFixed(2)}`;
  cartCountElement.textContent = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );
}

// Clear Cart Function
function clearCart() {
  Swal.fire({
    title: "Are you sure?",
    text: "This will remove all items from your cart.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, clear it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("cart");
      document.getElementById("cart-items").innerHTML = "";
      document.getElementById("cart-total").textContent = "$0.00";
      document.getElementById("cart-count").textContent = "0";

      Swal.fire({
        icon: "success",
        title: "Cleared!",
        text: "Your cart has been cleared.",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log("Cart cleared!");
    }
  });
}
