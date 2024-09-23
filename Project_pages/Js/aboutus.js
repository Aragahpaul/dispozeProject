// document.addEventListener("DOMContentLoaded", function() {
//     // Get the hamburger button and the navigation menu
//     const navbarToggler = document.querySelector('.navbar-toggler');
//     const navbarCollapse = document.querySelector('#navbarNav');

//     // Add a click event listener to the hamburger button
//     navbarToggler.addEventListener('click', function() {
//       // Toggle the 'collapse' class on the navigation menu
//       navbarCollapse.classList.toggle('show');
//     });
//   });

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
