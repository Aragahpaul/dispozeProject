// PAYMENT-OPTION DETAILS
// Credit-card
const creditCardRadio = document.getElementById("credit-card");
const cardDetailsDiv = document.getElementById("card-details");

creditCardRadio.addEventListener("change", () => {
  if (creditCardRadio.checked) {
    cardDetailsDiv.classList.remove("d-none");

    bankDetailsDiv.classList.add("d-none");
    cashDetailsDiv.classList.add("d-none");
  } else {
    cardDetailsDiv.classList.add("d-none");
  }
});

// Bank-Transfer
const bankTransferRadio = document.getElementById("bank-transfer");
const bankDetailsDiv = document.getElementById("bank-details");

bankTransferRadio.addEventListener("change", () => {
  if (bankTransferRadio.checked) {
    bankDetailsDiv.classList.remove("d-none");
    cardDetailsDiv.classList.add("d-none");
    cashDetailsDiv.classList.add("d-none");
  } else {
    bankDetailsDiv.classList.add("d-none");
  }
});

// cash-payment
const cashPaymentRadio = document.getElementById("cash-payment");
const cashDetailsDiv = document.getElementById("cash-details");

cashPaymentRadio.addEventListener("change", () => {
  if (cashPaymentRadio.checked) {
    cashDetailsDiv.classList.remove("d-none");
    cardDetailsDiv.classList.add("d-none");
    bankDetailsDiv.classList.add("d-none");
  } else {
    cashDetailsDiv.classList.add("d-none");
  }
});

// Show the popup and activate blur when the "Pay Now" button is clicked
const blurContainer = document.querySelector("#blurContainer"); // Get the blur container
const creditButton = document.getElementById("creditBtn");
const transferButton = document.getElementById("transferButton");
const cashButton = document.getElementById("cashButton");
creditButton.addEventListener("click", function () {
  paymentSuccessPopup.style.display = "block";
  blurContainer.classList.add("active"); // Add active class to show blur
});
transferButton.addEventListener("click", function () {
  transferSuccessPopup.style.display = "block";
  blurContainer.classList.add("active"); // Add active class to show blur
});
cashButton.addEventListener("click", function () {
  cashSuccessPopup.style.display = "block";
  blurContainer.classList.add("active"); // Add active class to show blur
});

// Close the popup and deactivate blur when the close button is clicked
const closeCreditButton = document.getElementById("closeCreditPopup");
const closeOkButton = document.getElementById("closeTransferPopup");
const closeCashButton = document.getElementById("closeCashPopup");

closeCreditButton.addEventListener("click", function () {
  paymentSuccessPopup.style.display = "none";
  blurContainer.classList.remove("active");
  window.location.href = "./home.html"; // Remove active class to hide blur
});
closeOkButton.addEventListener("click", function () {
  transferSuccessPopup.style.display = "none";
  blurContainer.classList.remove("active"); // Remove active class to hide blur
  window.location.href = "./home.html";
});
closeCashButton.addEventListener("click", function () {
  cashSuccessPopup.style.display = "none";
  blurContainer.classList.remove("active"); // Remove active class to hide blur
  window.location.href = "./home.html";
});
