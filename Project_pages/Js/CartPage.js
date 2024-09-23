// Script for navigation bar
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");
if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

document
  .getElementById("dropdownButton")
  .addEventListener("click", function () {
    const dropdownMenu = document.getElementById("dropdownMenu");

    if (
      dropdownMenu.style.display === "none" ||
      dropdownMenu.style.display === ""
    ) {
      dropdownMenu.style.display = "block";
    } else {
      dropdownMenu.style.display = "none";
    }
  });

window.addEventListener("click", function (e) {
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.getElementById("dropdownMenu");

  if (!dropdownButton.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.style.display = "none";
  }
});

//Notification modal

// const showModalBtn = document.getElementById("show-notification-modal");
// const showModalBtnMobile = document.querySelector(".show-notification-modal-mobile");
// const closeModalBtn = document.querySelector(".notification-closed");
// const notificationModal = document.querySelector(".noti-modal");
// const overlay = document.querySelector(".overlay");
// const closeNotificationMessageone = document.querySelector(".messageclosedone");
// const closeNotificationMessagetwo = document.querySelector(".messageclosedtwo");
// const closeNotificationMessagethree = document.querySelector(".messageclosedthree");
// const notificationMessageone = document.querySelector(".noti-messageoneDiv");
// const notificationMessagetwo = document.querySelector(".noti-messagetwoDiv");
// const notificationMessagethree = document.querySelector(".noti-messagethreeDiv");
// const notificationMessagecont = document.querySelector(".notificationMessagesContainer");

// showModalBtn.addEventListener("click", function(){
//   notificationModal.classList.remove("hidden");
//   overlay.classList.remove("hidden");
// })
// showModalBtnMobile.addEventListener("click", function(){
//   notificationModal.classList.remove("hidden");
//   overlay.classList.remove("hidden");
//   nav.classList.remove("active");

// })

//Notification modal

const showModalBtn = document.getElementById("show-notification-modal");
const showModalBtnMobile = document.querySelector(
  ".show-notification-modal-mobile"
);
const closeModalBtn = document.querySelector(".notification-closed");
const notificationModal = document.querySelector(".noti-modal");
const overlay = document.querySelector(".overlay");
const closeNotificationMessageone = document.querySelector(".messageclosedone");
const closeNotificationMessagetwo = document.querySelector(".messageclosedtwo");
const closeNotificationMessagethree = document.querySelector(
  ".messageclosedthree"
);
const notificationMessageone = document.querySelector(".noti-messageoneDiv");
const notificationMessagetwo = document.querySelector(".noti-messagetwoDiv");
const notificationMessagethree = document.querySelector(
  ".noti-messagethreeDiv"
);
const notificationMessagecont = document.querySelector(
  ".notificationMessagesContainer"
);

showModalBtn.addEventListener("click", function () {
  notificationModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
showModalBtnMobile.addEventListener("click", function () {
  notificationModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  nav.classList.remove("active");
});

closeModalBtn.addEventListener("click", function () {
  notificationModal.classList.add("hidden");
  overlay.classList.add("hidden");
});
closeNotificationMessageone.addEventListener("click", function () {
  notificationMessageone.style.display = "none";
});
closeNotificationMessagetwo.addEventListener("click", function () {
  notificationMessagetwo.style.display = "none";
});
closeNotificationMessagethree.addEventListener("click", function () {
  notificationMessagethree.style.display = "none";
});

// Function to display product details in HTML
async function displayCartProducts() {
  // Retrieve cart data from localStorage
  const cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    console.error("No cart data found in localStorage.");
    document.querySelector(".bigCont").innerHTML =
      "<p>No products in the cart.</p>";
    updateCartSummary(0); // Update cart summary with 0 total
    return;
  }

  // Prepare a set to hold product IDs and a map to hold categories
  const productIds = new Set();
  const categories = new Set();

  // Extract product IDs and categories from cart data
  for (const category in cart) {
    categories.add(category);
    for (const productId in cart[category]) {
      productIds.add(productId);
    }
  }

  if (categories.size === 0 || productIds.size === 0) {
    console.error("No products or categories found in the cart.");
    document.querySelector(".bigCont").innerHTML =
      "<p>No products in the cart.</p>";
    updateCartSummary(0); // Update cart summary with 0 total
    return;
  }

  // Define the API base URL (replace with your actual API endpoint)
  const apiBaseUrl = "https://studynow-be.onrender.com/api/v1/products";

  // Collect all category-based API promises
  const categoryPromises = Array.from(categories).map((category) =>
    fetch(`${apiBaseUrl}?productCategory=${category}`)
      .then((response) => response.json())
      .then((data) => data.docs)
      .catch((error) => {
        console.error(`Error fetching category ${category}:`, error);
        return [];
      })
  );

  try {
    // Wait for all API requests to complete
    const categoriesData = await Promise.all(categoryPromises);

    // Flatten the categoriesData array
    const productsData = categoriesData.flat();
    console.log(productsData);

    // Filter products data to find products in the cart
    const filteredProducts = productsData.filter(
      (product) => productIds.has(product._id)
      // || productIds.has(product.productName)
    );
    console.log(filteredProducts);

    // Get the container element to display product details
    const container = document.querySelector(".bigCont");
    // const subTotalContainer = document.querySelector(".subTotalContainer");
    // Clear any existing content
    container.innerHTML = "";

    let totalAmount = 0; // Initialize total amount

    if (filteredProducts.length === 0) {
      container.innerHTML = '<h1 align="center">Cart Is Empty.</h1>';
      updateCartSummary(totalAmount);
      return;
    }

    // Display the product details
    filteredProducts.forEach((product) => {
      const count = cart[product.productCategory][product._id].count;
      const totalPrice = (product.price * count).toFixed(2); // Calculate total price

      // const totalPrice = (product.price * count);
      // const priceInfo = document.createElement("p");
      // priceInfo.className ='summarySubTotalPrice';
      // priceInfo.textContent =price: ${totalPrice};
      const html = `
        <div class="flexContainer">
        <!--Section for product's image, name, price and removeText functionality (Start) -->
        <div class="productContainer">
             <div class="productImage">
                 <img src=${product.productImages[0]} width="249px" height="368px">
             </div>
             <div class="productName">
                 <h4>${product.productName}</h4>
             </div>
             <div class="price_removeTextContainer">
                 <p class="price">${product.price}</p>
                 <p class="removeText"data-id="${product._id}">Remove</p>
             </div>
        </div>
        


        
         <div class="detailsContainer">
            <div>
                <h2>New ${product.productName}</h2>
            </div>
            
            <div class="fullProductDetails">
                <section class="dimensionSection"><p>Dimension: ${product.dimensions}.</p> 
                    <p>${product.capacity} litre capacity.</p> 
                <p>Holds: ${product.capacity}</p></section>
                <section class="bestUseSection"><p>Best Use: ${product.bestUse}</p></section>
                <section class="qualitySection"><p>${product.description} ${product.features}</p></section>
                <section class="manufactureSection"><p>Manufactured from new virgin ${product.material} only</p></section>
                
            </div>

            <div class="qtyOperation" align="center">
                <button class="increment" data-id="${product._id}" >+</button>
                <input id="quantityInput-${product._id} type="number" value="${count}"/>
                <button class="decrement" data-id="${product._id}">-</button>
            </div>
          </div>
          </div>
              
             `;
      //  console.log(quantityInput${1+i});
      container.insertAdjacentHTML("beforeend", html);

      // Update total amount
      totalAmount += parseFloat(totalPrice);
    });

    // Update cart summary
    updateCartSummary(totalAmount);

    // Add event listeners for increment and decrement buttons
    document.querySelectorAll(".increment").forEach((button) => {
      button.addEventListener("click", () => updateCount(button.dataset.id, 1));
    });

    document.querySelectorAll(".decrement").forEach((button) => {
      button.addEventListener("click", () =>
        updateCount(button.dataset.id, -1)
      );
    });

    document.querySelectorAll(".removeText").forEach((button) => {
      button.addEventListener("click", () => removeProduct(button.dataset.id));
    });
  } catch (error) {
    console.error("Error processing product details:", error);
    document.querySelector(".bigCont").innerHTML =
      "<p>Error displaying products.</p>";
    updateCartSummary(0); // Update cart summary with 0 total
  }
}
// Function to update product count and refresh display
function updateCount(productId, change) {
  const cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    console.error("No cart data found in localStorage.");
    return;
  }

  for (const category in cart) {
    if (cart[category][productId]) {
      cart[category][productId].count += change;

      // Ensure count doesn't go below 1
      if (cart[category][productId].count < 1) {
        delete cart[category][productId];
      }

      // Remove category if empty
      if (Object.keys(cart[category]).length === 0) {
        delete cart[category];
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartProducts(); // Refresh the display
      return;
    }
  }
}
// Function to remove a product from the cart
function removeProduct(productId) {
  const cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    console.error("No cart data found in localStorage.");
    return;
  }

  for (const category in cart) {
    if (cart[category][productId]) {
      delete cart[category][productId];

      // Remove category if empty
      if (Object.keys(cart[category]).length === 0) {
        delete cart[category];
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartProducts(); // Refresh the display
      return;
    }
  }
}
// Function to update the cart summary
function updateCartSummary(totalAmount) {
  document.querySelector(
    ".summarySubTotalPrice"
  ).innerHTML = `\u{20A6}${totalAmount.toLocaleString()}`;
  document.querySelector(
    ".summaryTotalprice"
  ).textContent = ` \u{20A6}${totalAmount.toLocaleString()}`;
  document.querySelector(
    ".checkoutPrice"
  ).textContent = `Checkout (\u{20A6}${totalAmount.toLocaleString()})`;
}
displayCartProducts();
