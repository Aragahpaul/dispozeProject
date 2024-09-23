document.getElementById("confirmPickupBtn").onclick = function () {
  document.getElementById("billModal").style.display = "block";
};

document.getElementById("proceedToPayBtn").onclick = function () {
  window.location.href = "/Project_pages/pickupPayment.html"; // Replace with your actual payment page URL
};

// Close the modal when clicking anywhere outside of the modal
window.onclick = function (event) {
  var modal = document.getElementById("billModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Function to populate confirmation details
function populateConfirmationDetails() {
  // Retrieve form data from sessionStorage
  const formData = JSON.parse(sessionStorage.getItem("pickupFormData"));

  if (formData) {
    // Update the HTML with form data
    document.querySelector(".custom-text strong.text-dark").textContent =
      formData.category;
    document.querySelectorAll(".custom-text strong.text-dark")[1].textContent =
      formData.quantity;
    document.querySelectorAll(".custom-text strong.text-dark")[2].textContent =
      formData.date;
    document.querySelectorAll(".custom-text strong.text-dark")[3].textContent =
      formData.time;
    document.querySelectorAll(".custom-text strong.text-dark")[4].textContent =
      formData.address;
    document.querySelector(
      ".custom-text strong.text-dark"
    ).nextElementSibling.textContent = formData.fee;
  } else {
    // Handle the case where no data is available
    console.log("No form data found in sessionStorage.");
  }
}

// Call the function to populate the details when the page loads
window.addEventListener("load", populateConfirmationDetails);
