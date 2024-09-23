const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const altPhoneInput = document.getElementById('altPhone');
const emailInput = document.getElementById('email');
const surnameInput = document.getElementById('surname');
const firstNameInput = document.getElementById('firstName');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');

// Error message elements
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const altPhoneError = document.getElementById('altPhoneError');

// Toggle password visibility
togglePassword.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.querySelector('i').classList.toggle('fa-eye-slash');
    this.querySelector('i').classList.toggle('fa-eye');
});

const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
const confirmPassword = document.querySelector('#confirmPassword');

toggleConfirmPassword.addEventListener('click', function () {
    const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', type);
    this.querySelector('i').classList.toggle('fa-eye-slash');
    this.querySelector('i').classList.toggle('fa-eye');
});

// Regular expression for validating email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regular expression for password (at least 8 characters, one special character)
const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

// Regular expression for alternative phone number (optional, similar pattern as phone number)
const phoneRegex = /^\+?\d{0,3}?[- .]?\(?\d{1,4}?\)?[- .]?\d{1,4}[- .]?\d{1,9}$/;

let confirmPasswordStarted = false;

function validateInputs() {
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const altPhone = altPhoneInput.value;

    // Reset error messages
    emailError.textContent = '';
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';
    altPhoneError.textContent = '';

    let isValid = true;

    // Validate email format
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Validate password
    if (!passwordRegex.test(password)) {
        passwordError.textContent = 'Password must be at least 8 characters long and contain at least one special character.';
        isValid = false;
    }

    // Validate confirm password matches password only if user has started typing in confirmPassword
    if (confirmPasswordStarted && password !== confirmPassword) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        isValid = false;
    }

    // Validate alternative phone number if provided
    if (altPhone && !phoneRegex.test(altPhone)) {
        altPhoneError.textContent = 'Please enter a valid alternative phone number.';
        isValid = false;
    }

    // Enable or disable the submit button based on validation
    if (isValid) {
        submitBtn.disabled = false;
        submitBtn.classList.add('enabled');
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.remove('enabled');
    }
}

// Add event listeners to validate on input change
emailInput.addEventListener('input', validateInputs);
passwordInput.addEventListener('input', validateInputs);
altPhoneInput.addEventListener('input', validateInputs);

// Track when the user starts typing in the confirmPassword field
confirmPasswordInput.addEventListener('input', function () {
    confirmPasswordStarted = true;
    validateInputs();
});

const errmsg = document.querySelector('.err-msg')

async function handleSignup(event) {
    event.preventDefault(); // Prevent default form submission

    const data = {
        firstName: firstNameInput.value,
        lastName: surnameInput.value,
        email: emailInput.value,
        phoneNumber: phoneInput.value,
        password: passwordInput.value,
        // altPhone: altPhoneInput.value
    };

    try {
        const response = await fetch('https://studynow-be.onrender.com/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            console.log('Signup successful:', result);
            window.location.replace('/Project_pages/sucess.html')
            // Handle successful signup (e.g., redirect to a different page)
        } else {
            console.error('Signup failed:', result);
            errmsg.textContent = result.message
            // Handle signup failure (e.g., display an error message)
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle network errors
    }
}

// Event listener for form submission
document.getElementById('signupForm').addEventListener('submit', handleSignup);


// const togglePassword = document.querySelector('#togglePassword');
// const password = document.querySelector('#password');
// const emailInput = document.getElementById('email');
// const passwordInput = document.getElementById('password');
// const confirmPasswordInput = document.getElementById('confirmPassword');
// const altPhoneInput = document.getElementById('altPhone');
// const errorMessage = document.getElementById('error-message');
// const submitBtn = document.getElementById('submitBtn');

// // Toggle password visibility
// togglePassword.addEventListener('click', function () {
//     const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
//     password.setAttribute('type', type);
//     this.querySelector('i').classList.toggle('fa-eye-slash');
//     this.querySelector('i').classList.toggle('fa-eye');
// });

// const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
// const confirmPassword = document.querySelector('#confirmPassword');

// toggleConfirmPassword.addEventListener('click', function () {
//     const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
//     confirmPassword.setAttribute('type', type);
//     this.querySelector('i').classList.toggle('fa-eye-slash');
//     this.querySelector('i').classList.toggle('fa-eye');
// });

// // Regular expression for validating email format
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// // Regular expression for password (at least 8 characters, one special character)
// const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

// // Regular expression for alternative phone number (optional, similar pattern as phone number)
// const phoneRegex = /^\+?\d{0,3}?[- .]?\(?\d{1,4}?\)?[- .]?\d{1,4}[- .]?\d{1,9}$/;

// function validateInputs() {
//     const email = emailInput.value;
//     const password = passwordInput.value;
//     const confirmPassword = confirmPasswordInput.value;
//     const altPhone = altPhoneInput.value;

//     // Reset the error message
//     errorMessage.textContent = '';

//     // Validate email format
//     if (!emailRegex.test(email)) {
//         errorMessage.textContent = 'Please enter a valid email address.';
//         submitBtn.disabled = true;
//         submitBtn.classList.remove('enabled');
//         return;
//     }

//     // Validate password
//     if (!passwordRegex.test(password)) {
//         errorMessage.textContent = 'Password must be at least 8 characters long and contain at least one special character.';
//         submitBtn.disabled = true;
//         submitBtn.classList.remove('enabled');
//         return;
//     }

//     // Validate confirm password matches password
//     if (password !== confirmPassword) {
//         errorMessage.textContent = 'Passwords do not match.';
//         submitBtn.disabled = true;
//         submitBtn.classList.remove('enabled');
//         return;
//     }

//     // Validate alternative phone number if provided
//     if (altPhone && !phoneRegex.test(altPhone)) {
//         errorMessage.textContent = 'Please enter a valid alternative phone number.';
//         submitBtn.disabled = true;
//         submitBtn.classList.remove('enabled');
//         return;
//     }

//     // If all validations pass, enable the submit button
//     submitBtn.disabled = false;
//     submitBtn.classList.add('enabled');
// }

// // Add event listeners to validate on input change
// emailInput.addEventListener('input', validateInputs);
// passwordInput.addEventListener('input', validateInputs);
// confirmPasswordInput.addEventListener('input', validateInputs);
// altPhoneInput.addEventListener('input', validateInputs);
