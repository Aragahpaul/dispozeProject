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