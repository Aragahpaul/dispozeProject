// PAYMENT-OPTION DETAILS
// Credit-card
const creditCardRadio = document.getElementById("credit-card");
const cardDetailsPickUpDiv = document.getElementById("card-detailsPickUp");

creditCardRadio.addEventListener("change", () => {
    if (creditCardRadio.checked) {
        cardDetailsPickUpDiv.classList.remove("d-none");
        bankDetailsPickUpDiv.classList.add("d-none");
        cashDetailsPickUpDiv.classList.add("d-none");
    } else {
        cardDetailsPickUpDiv.classList.add("d-none");
    }
});

// Bank-Transfer
const bankTransferRadio = document.getElementById("bank-transfer");
const bankDetailsPickUpDiv = document.getElementById("bank-detailsPickUp");

bankTransferRadio.addEventListener("change", () => {
    if (bankTransferRadio.checked) {
        bankDetailsPickUpDiv.classList.remove("d-none");
        cardDetailsPickUpDiv.classList.add("d-none");
        cashDetailsPickUpDiv.classList.add("d-none");
    } else {
        bankDetailsPickUpDiv.classList.add("d-none");
    }
});

//  cash-payment
const cashPaymentRadio = document.getElementById("cash-payment");
const cashDetailsPickUpDiv = document.getElementById("cash-detailsPickUp");

cashPaymentRadio.addEventListener("change", () => {
    if (cashPaymentRadio.checked) {
        cashDetailsPickUpDiv.classList.remove("d-none");
        cardDetailsPickUpDiv.classList.add("d-none");
        bankDetailsPickUpDiv.classList.add("d-none");
    } else {
        cashDetailsPickUpDiv.classList.add("d-none");
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
    window.location.href= '../../Project_pages/home.html'
    blurContainer.classList.remove("active"); // Remove active class to hide blur
});
closeOkButton.addEventListener("click", function () {
    transferSuccessPopup.style.display = "none";
    window.location.href= '../../Project_pages/home.html'
    blurContainer.classList.remove("active"); // Remove active class to hide blur
});
closeCashButton.addEventListener("click", function () {
    cashSuccessPopup.style.display = "none";
    window.location.href= '../../Project_pages/home.html'
    blurContainer.classList.remove("active"); // Remove active class to hide blur
});
