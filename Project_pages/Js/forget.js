document.addEventListener("DOMContentLoaded", function () {
  // Select all the input fields and the button
  const inputs = document.querySelectorAll(".otp-input");
  const resetBtn = document.getElementById("reset-btn");

  // Function to check if all inputs are filled
  function checkInputs() {
    const allFilled = Array.from(inputs).every((input) => input.value !== "");
    if (allFilled) {
      resetBtn.removeAttribute("disabled");
      resetBtn.classList.add("enabled");
    } else {
      resetBtn.setAttribute("disabled", "true");
      resetBtn.classList.remove("enabled");
    }
  }

  // Attach event listeners to each input field
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      // Move to the next input field when typing
      if (input.value.length === input.maxLength) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      }
      // Check if all inputs are filled
      checkInputs();
    });

    input.addEventListener("keydown", (event) => {
      // Allow user to use backspace to move to the previous field
      if (
        event.key === "Backspace" &&
        input.value.length === 0 &&
        index !== 0
      ) {
        inputs[index - 1].focus();
      }
    });
  });

  // Function to handle the API request
  function handleResetPassword() {
    const otp = Array.from(inputs)
      .map((input) => input.value)
      .join("");

    // The payload to send in the request
    const payload = {
      otp: otp,
      email: "example@domain.com", // Replace with the actual email if you have it
    };

    // Making the API request using axios
    axios
      .post(
        "https://studynow-be.onrender.com/api/v1/auth/forgot-password",
        payload
      )
      .then((response) => {
        console.log("Success:", response.data);
        alert("OTP verified successfully. Proceed to reset your password.");
        console.log("Redirecting to reset password page...");

        window.location.href = "/Project_pages/reset.html"; // Update this path
      })
      .catch((error) => {
        console.error("Error:", error.response);
        alert("Failed to verify OTP. Please try again.");
      });
  }

  // Attach the API call to the button click event
  resetBtn.addEventListener("click", function () {
    if (!resetBtn.disabled) {
      handleResetPassword();
    }
  });
});
