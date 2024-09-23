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


// Function to fetch and display products based on the selected category
function fetchProducts(category) {
  var requestOptions = {
      method: 'GET',
      redirect: 'follow'
  };

  fetch(`https://studynow-be.onrender.com/api/v1/products?productCategory=${category}`, requestOptions)
      .then(response => response.json())
      .then(data => displayProducts(data.docs, category))  // Pass category to displayProducts
      .catch(error => console.log('error', error));
}

// Function to save/update product information in the cart in local storage
function saveProductToCart(category, productId, productName, count) {
  const cart = JSON.parse(localStorage.getItem('cart')) || {};

  if (!cart[category]) {
      cart[category] = {};
  }

  // Save the product ID, name, and count in the cart
  cart[category][productId] = {
      name: productName,
      count: count
  };

  // Save the updated cart back to local storage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to save the selected product directly for payment
function saveProductForPayment(category, productId, productName, count) {
  const productForPayment = {
      category,
      productId,
      name: productName,
      count
  };

  // Save the product details to local storage for payment
  localStorage.setItem('productForPayment', JSON.stringify(productForPayment));
}


// Function to display products on the page
function displayProducts(products, category) {
  const productSection = document.querySelector('.productSection');
  productSection.innerHTML = ''; // Clear existing products

  products.forEach(product => {
      const productItem = `
      <div class="cart-item">
        <img src="${product.productImages[0] || 'placeholder.jpg'}" alt="${product.productName}" class="productImage">
        <div class="productStructure">
          <div class="productDetails">
            <p class="productName">${product.productName}</p>
            <p class="productPrice">₦${product.price}</p>
            <p class="productCapacity">Capacity: ${product.capacity}</p>
            <p class="productBestUse">Best Use: ${product.bestUse}</p>
          </div>
          <div class="itemButtons">
            <button class="buyNow">Buy Now</button>
            <div class="control">
              <div class="quantity-control">
                <button class="decrement">-</button>
                <span id="item-count">1</span>
                <button class="increment">+</button>
              </div>
              <button class="addCart">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      `;
      productSection.innerHTML += productItem;
  });

  // Handle quantity increment and decrement
  const incrementButtons = document.querySelectorAll('.increment');
  const decrementButtons = document.querySelectorAll('.decrement');
  const itemCounts = document.querySelectorAll('#item-count');

  incrementButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
          let count = parseInt(itemCounts[index].innerText);
          count++;
          itemCounts[index].innerText = count;
      });
  });

  decrementButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
          let count = parseInt(itemCounts[index].innerText);
          if (count > 1) {
              count--;
              itemCounts[index].innerText = count;
          }
      });
  });



  // Add event listeners for product name and image
  const productNames = document.querySelectorAll('.productName');
  const productImages = document.querySelectorAll('.productImage');
  const addCartButtons = document.querySelectorAll('.addCart');
  const buyNowButtons = document.querySelectorAll('.buyNow');

    // Define the redirect URL based on the category
  let redirectUrl;
  switch (category) {
      case 'Dumpster':
          redirectUrl = '../dumpster.html';
          break;
      case 'Container':
          redirectUrl = '../product-page.html';
          break;
      case 'Bagster':
          redirectUrl = '../bagster.html';
          break;
      default:
          redirectUrl = '../error.html'; 
          break;
  }

  productNames.forEach((name, index) => {
      name.addEventListener('click', () => {
          const count = parseInt(itemCounts[index].innerText);
          saveProductToCart(category, products[index]._id, products[index].productName, count);
          window.location.href = redirectUrl;
      });
  });

  productImages.forEach((image, index) => {
      image.addEventListener('click', () => {
          const count = parseInt(itemCounts[index].innerText);
          saveProductToCart(category, products[index]._id, products[index].productName, count);
          window.location.href = redirectUrl;
      });
  });

    addCartButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
          const count = parseInt(itemCounts[index].innerText);
          saveProductToCart(category, products[index]._id, products[index].productName, count);
      });
  });

    buyNowButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
          const count = parseInt(itemCounts[index].innerText);
          saveProductForPayment(category, products[index]._id, products[index].name, count);
          window.location.href = '../cartPayment.html'; 
      });
  });
}



// Fetch the default category on page load
document.addEventListener('DOMContentLoaded', () => {
  const activeLink = document.querySelector('.headingSection .navigation .active');
  if (activeLink) {
      const category = activeLink.getAttribute('data-category');
      fetchProducts(category);
  }
});






//Notification modal

const showModalBtn = document.getElementById("show-notification-modal");
const showModalBtnMobile = document.querySelector(".show-notification-modal-mobile");
const closeModalBtn = document.querySelector(".notification-closed");
const notificationModal = document.querySelector(".noti-modal");
const overlay = document.querySelector(".overlay");
const closeNotificationMessageone = document.querySelector(".messageclosedone");
const closeNotificationMessagetwo = document.querySelector(".messageclosedtwo");
const closeNotificationMessagethree = document.querySelector(".messageclosedthree");
const notificationMessageone = document.querySelector(".noti-messageoneDiv");
const notificationMessagetwo = document.querySelector(".noti-messagetwoDiv");
const notificationMessagethree = document.querySelector(".noti-messagethreeDiv");
const notificationMessagecont = document.querySelector(".notificationMessagesContainer");


showModalBtn.addEventListener("click", function(){
  notificationModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
})
showModalBtnMobile.addEventListener("click", function(){
  notificationModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  nav.classList.remove("active");
    

})

closeModalBtn.addEventListener("click", function(){
  notificationModal.classList.add("hidden");
  overlay.classList.add("hidden");
})
closeNotificationMessageone.addEventListener("click", function(){
  notificationMessageone.style.display = "none";
  
})
closeNotificationMessagetwo.addEventListener("click", function(){
  notificationMessagetwo.style.display = "none";
  
})
closeNotificationMessagethree.addEventListener("click", function(){
  notificationMessagethree.style.display = "none";
  
})

