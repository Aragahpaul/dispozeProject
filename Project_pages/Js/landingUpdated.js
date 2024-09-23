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

