// Select all the input fields and the button
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
});
