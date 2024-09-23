document.addEventListener("DOMContentLoaded", function () {
  // Time Modal
  const timeInput = document.getElementById("time");
  const manualTimeInput = document.getElementById("manualTimeInput");
  const timeModal = document.getElementById("timeModal");
  const saveTimeButton = document.getElementById("saveTime");
  const cancelTimeButton = document.getElementById("cancelTime");

  let currentHour = 12;
  let currentMinute = 0;
  let currentAmpm = "AM";
  let currentSelection = "hour";

  function updateDisplay() {
    manualTimeInput.value = `${currentHour
      .toString()
      .padStart(2, "0")}:${currentMinute
      .toString()
      .padStart(2, "0")} ${currentAmpm}`;
  }

  function openTimeModal() {
    const currentTime = timeInput.value.split(" ");
    if (currentTime.length === 2) {
      const [currentHours, currentMinutes] = currentTime[0].split(":");
      currentHour = parseInt(currentHours, 10);
      currentMinute = parseInt(currentMinutes, 10);
      currentAmpm = currentTime[1];
    } else {
      currentHour = 12;
      currentMinute = 0;
      currentAmpm = "AM";
    }
    updateDisplay();
    timeModal.style.display = "block";
    document.querySelector(".modal-content").classList.add("show");
  }

  function closeTimeModal() {
    timeModal.style.display = "none";
    document.querySelector(".modal-content").classList.remove("show");
  }

  manualTimeInput.addEventListener("wheel", function (event) {
    const delta = Math.sign(event.deltaY);
    if (currentSelection === "hour") {
      currentHour = (currentHour + delta + 12) % 12 || 12;
    } else if (currentSelection === "minute") {
      currentMinute = (currentMinute + delta + 60) % 60;
    } else if (currentSelection === "ampm") {
      currentAmpm = currentAmpm === "AM" ? "PM" : "AM";
    }
    updateDisplay();
    event.preventDefault();
  });

  manualTimeInput.addEventListener("click", function () {
    if (currentSelection === "hour") {
      currentSelection = "minute";
    } else if (currentSelection === "minute") {
      currentSelection = "ampm";
    } else if (currentSelection === "ampm") {
      currentSelection = "hour";
    }
  });

  saveTimeButton.addEventListener("click", function () {
    timeInput.value = manualTimeInput.value;
    closeTimeModal();
  });

  cancelTimeButton.addEventListener("click", function () {
    closeTimeModal();
  });

  timeInput.addEventListener("click", function (event) {
    event.preventDefault();
    openTimeModal();
  });

  window.onclick = function (event) {
    if (event.target == timeModal) {
      closeTimeModal();
    }
  };

  // Calendar Modal
  const dateInput = document.getElementById("date");
  const calendarModal = document.getElementById("calendarModal");
  const calendarMonth = document.getElementById("calendarMonth");
  const calendarDates = document.getElementById("calendarDates");
  const prevMonthButton = document.getElementById("prevMonth");
  const nextMonthButton = document.getElementById("nextMonth");

  let currentMonth = new Date().getMonth(); // 0-based index for months
  let currentYear = new Date().getFullYear();

  function renderCalendar() {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const numDays = lastDay.getDate();
    const firstDayWeekday = firstDay.getDay();
    calendarDates.innerHTML = "";

    for (let i = 0; i < firstDayWeekday; i++) {
      calendarDates.innerHTML += '<span class="date"></span>';
    }

    for (let i = 1; i <= numDays; i++) {
      calendarDates.innerHTML += `<span class="date">${i}</span>`;
    }
    calendarMonth.textContent = `${firstDay.toLocaleString("default", {
      month: "long",
    })} ${currentYear}`;
  }

  function openCalendarModal() {
    renderCalendar();
    calendarModal.style.display = "block";
  }

  function closeCalendarModal() {
    calendarModal.style.display = "none";
  }

  prevMonthButton.addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  nextMonthButton.addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });

  calendarDates.addEventListener("click", function (event) {
    if (event.target.classList.contains("date")) {
      const selectedDay = parseInt(event.target.textContent, 10);
      const selectedDate = new Date(currentYear, currentMonth, selectedDay);

      const options = { day: "numeric", month: "long", year: "numeric" };
      const formattedDate = selectedDate.toLocaleDateString("en-US", options);

      dateInput.value = formattedDate;
      closeCalendarModal();
    }
  });

  dateInput.addEventListener("click", function (event) {
    event.preventDefault();
    openCalendarModal();
  });

  window.onclick = function (event) {
    if (event.target == calendarModal) {
      closeCalendarModal();
    }
  };

  // Dropdown Modal
  const categoryInput = document.getElementById("categoryDropdown");
  const dropdownContent = document.getElementById("dropdown");

  function toggleDropdown() {
    dropdownContent.style.display = "block";
  }

  function closeDropdown() {
    dropdownContent.style.display = "none";
  }

  function updateCategory() {
    const checkboxes = dropdownContent.querySelectorAll(
      'input[type="checkbox"]'
    );
    let selectedCategories = [];
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedCategories.push(checkbox.parentNode.textContent.trim());
      }
    });
    categoryInput.value = selectedCategories.length
      ? selectedCategories.join(", ")
      : "Choose waste type";
    closeDropdown();
  }

  categoryInput.addEventListener("click", function (event) {
    event.preventDefault();
    toggleDropdown();
  });

  dropdownContent
    .querySelector("button")
    .addEventListener("click", function () {
      updateCategory();
    });

  window.onclick = function (event) {
    if (!event.target.matches("#categoryDropdown")) {
      if (dropdownContent.style.display === "block") {
        closeDropdown();
      }
    }
  };
});
document.addEventListener("DOMContentLoaded", function () {
  const noteTextarea = document.getElementById("note");
  const noteCounter = document.getElementById("noteCounter");
  const maxLength = noteTextarea.getAttribute("maxlength");

  function updateCounter() {
    const currentLength = noteTextarea.value.length;
    noteCounter.textContent = `${currentLength}/${maxLength}`;
  }

  noteTextarea.addEventListener("input", updateCounter);

  // Initialize counter on page load
  updateCounter();
});
function navigateToPickup() {
  window.location.href = "pickup-confirmation.html";
}

// Function to handle form submission
function navigateToPickup() {
  // Get form values
  const category = document.querySelector('input[id="categoryDropdown"]').value;
  const quantity = document.querySelector('input[id="quantity"]').value;
  const date = document.querySelector('input[id="date"]').value;
  const address = document.querySelector('input[id="address"]').value;
  const time = document.querySelector('input[id="time"]').value;
  const note = document.querySelector('textarea[id="note"]').value;

  // Create an object to store form data
  const formData = {
    category: category,
    quantity: quantity,
    date: date,
    address: address,
    time: time,
    note: note,
    fee: "₦1,200", // You might want to calculate this dynamically
  };

  // Store form data in sessionStorage
  sessionStorage.setItem("pickupFormData", JSON.stringify(formData));

  // Redirect to pickup-confirmation.html
  window.location.href = "pickup-confirmation.html";
}

// Add event listener to the button
document
  .querySelector(".schedule-button")
  .addEventListener("click", navigateToPickup);
