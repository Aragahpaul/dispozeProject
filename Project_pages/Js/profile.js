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
// Function to load existing profile data when the page loads
function loadProfileData() {
  const firstNameInput = document.getElementById('profileName');
  const surnameInput = document.getElementById('profileSurname');
  const emailInput = document.getElementById('profileEmail');
  const phoneNumberInput = document.getElementById('profileTel');
  const altPhoneNumberInput = document.getElementById('profileAltTel');
  const addressInput = document.getElementById('profileAddress');
  const jobTitleInput = document.getElementById('profileJobTitle');

  if (firstNameInput) firstNameInput.innerText = localStorage.getItem('profileName') || 'John';
  if (surnameInput) surnameInput.innerText = localStorage.getItem('profileSurname') || 'Williams';
  if (emailInput) emailInput.innerText = localStorage.getItem('profileEmail') || 'johnwilliams@domain.com';
  if (phoneNumberInput) phoneNumberInput.innerText = localStorage.getItem('profileTel') || '+234-000-000-0000';
  if (altPhoneNumberInput) altPhoneNumberInput.innerText = localStorage.getItem('profileAltTel') || '+234-000-000-0000';
  if (addressInput) addressInput.innerText = localStorage.getItem('profileAddress') || '10, KodeCamp street, Lagos';
  if (jobTitleInput) jobTitleInput.innerText = localStorage.getItem('profileJobTitle') || 'Product Designer';
}

// Preview the selected profile image
function previewImage(event) {
  const profileImagePreview = document.getElementById('profileImagePreview');
  if (profileImagePreview) {
    const reader = new FileReader();
    reader.onload = function () {
      profileImagePreview.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}

// Save profile data to localStorage
function saveProfile() {
  const firstName = document.getElementById('firstNameInput').value.trim();
  const surname = document.getElementById('surnameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const phoneNumber = document.getElementById('phoneNumberInput').value.trim();
  const altPhoneNumber = document.getElementById('altPhoneNumberInput').value.trim();
  const address = document.getElementById('addressInput').value.trim();
  const jobTitle = document.getElementById('jobTitleInput').value.trim();

  console.log(firstName)

  if (firstName && surname && email && phoneNumber && altPhoneNumber && address && jobTitle) {
    localStorage.setItem('profileName', firstName);
    localStorage.setItem('profileSurname', surname);
    localStorage.setItem('profileEmail', email);
    localStorage.setItem('profileTel', phoneNumber);
    localStorage.setItem('profileAltTel', altPhoneNumber);
    localStorage.setItem('profileAddress', address);
    localStorage.setItem('profileJobTitle', jobTitle);

    // Save profile image to localStorage if a new image is selected

    alert("Profile saved successfully!");
    window.location.href = "profile.html"; // Redirect to the profile display page
  } else {
    alert("Please fill in all fields.");
  }
}

// Load profile data when the page loads
window.onload = function () {
  loadProfileData();
};

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