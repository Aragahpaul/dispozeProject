// Get the necessary elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");

// Get error message elements
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

// Regular expressions for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*).{8,}$/;

function validateInputs() {
  const email = emailInput.value;
  const password = passwordInput.value;

  // Reset error messages
  emailError.textContent = "";
  passwordError.textContent = "";

  let isValid = true;

  // Validate email format
  if (!emailRegex.test(email)) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  // Validate password (at least 8 characters)
  if (!passwordRegex.test(password)) {
    passwordError.textContent = "Password must be at least 8 characters long.";
    isValid = false;
  }

  // Enable or disable submit button based on validation
  submitBtn.disabled = !isValid;
}

// Add event listeners to validate on input change
emailInput.addEventListener("input", validateInputs);
passwordInput.addEventListener("input", validateInputs);

// Toggle password visibility
document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Toggle the eye icon
    this.classList.toggle("fa-eye-slash");
    this.classList.toggle("fa-eye");
  });

// Add event listener for form submission
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from submitting the default way

    // Perform validation before sending the request
    validateInputs();

    // If submit button is disabled, return (means validation failed)
    if (submitBtn.disabled) {
      return;
    }

    try {
      // Make the POST request to the login API
      const response = await fetch(
        "https://studynow-be.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // If login is successful, redirect to /project_page/home.html
        console.log("Login successful:", data);
        // alert('Login successful!');
        window.location.href = "/Project_pages/home.html"; // Redirect to home page
      } else {
        // If login fails, display error message from the server
        console.log("Login failed:", data);
        if (data.message) {
          emailError.textContent = data.message;
        } else {
          emailError.textContent =
            "Login failed. Please check your credentials.";
        }
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during login:", error);
      emailError.textContent = "An error occurred. Please try again later.";
    }

    // Re-enable the submit button after handling the response
    submitBtn.disabled = false;
  });
