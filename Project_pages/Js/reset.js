document.addEventListener('DOMContentLoaded', function () {
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const resetPasswordButton = document.getElementById('reset-password-button');

    newPasswordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validatePassword);

    function validatePassword() {
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (newPassword === confirmPassword && newPassword.length >= 8 && /[^A-Za-z0-9]/.test(newPassword)) {
            resetPasswordButton.disabled = false;
            resetPasswordButton.classList.remove('disabled');
        } else {
            resetPasswordButton.disabled = true;
            resetPasswordButton.classList.add('disabled');
        }
    }

    // Toggle password visibility
    const togglePassword = document.getElementById('toggle-password');
    const toggleConfirmPassword = document.getElementById('toggle-confirm-password');

    togglePassword.addEventListener('click', () => {
        const type = newPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        newPasswordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    toggleConfirmPassword.addEventListener('click', () => {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        toggleConfirmPassword.classList.toggle('fa-eye');
        toggleConfirmPassword.classList.toggle('fa-eye-slash');
    });

    // Ensure the eye icon does not disappear during typing
    newPasswordInput.addEventListener('input', () => {
        togglePassword.style.visibility = 'visible';
    });

    confirmPasswordInput.addEventListener('input', () => {
        toggleConfirmPassword.style.visibility = 'visible';
    });

    // Handle form submission
    const resetPasswordForm = document.getElementById('reset-password-form');
    resetPasswordForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Example user identifier, like email or token, should be passed with the request
        const payload = {
            password: newPassword,
            confirmPassword: confirmPassword,
            // Assuming you're using a token or email
            email: 'example@domain.com'  // Replace with actual identifier if required
        };

        // Make API request using axios
        axios.post('https://studynow-be.onrender.com/api/v1/auth/reset-password', payload)
            .then(response => {
                // Handle success response
                console.log(response.data);
                alert('Password has been reset successfully!');
                // Redirect the user to the login page
                window.location.href = '/Project_pages/login.html';
            })
            .catch(error => {
                // Handle error response
                console.error(error.response.data);
                alert('Failed to reset password. Please try again.');
            });

    });
});
