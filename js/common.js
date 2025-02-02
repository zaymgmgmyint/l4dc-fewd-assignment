(function () {
  "use strict";

  // Wait for the DOM to fully load
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("eventForm");

    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Check form validity
        if (!form.checkValidity()) {
          form.classList.add("was-validated");
          return;
        }

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const eventSelected = document.getElementById("event").value;

        // Create mailto link
        const subject = `Event Register: ${eventSelected}`;
        const body = `Full Name: ${name}, Email: ${email}`;

        // Open the email client
        window.location.href = `mailto:zaymaungmaungmyint.info@gmail.com?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;

        // Reset the form after successful submission
        form.reset();
        form.classList.remove("was-validated");
      });
    }
  });
})();

function sendSubscriptionEmail() {
  const email = document.getElementById("newsletterEmail").value;

  if (!email) {
    alert("Please enter a valid email address.");
    return false;
  }

  const subject = "Newsletter Subscription";
  const body = `Please subscribe this email to your newsletter: ${email}`;

  // Open the email client with pre-filled data
  window.location.href = `mailto:zaymaungmaungmyint.info@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return false; // Prevent form submission
}

function searchCoffee() {
  const searchInput = document.getElementById("search-box").value.toLowerCase();
  const coffeeItems = document.querySelectorAll(".coffee-item");

  coffeeItems.forEach((item) => {
    const coffeeName = item.getAttribute("data-name").toLowerCase();
    if (coffeeName.includes(searchInput)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
