
document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signinForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    createErrorElement(emailInput.parentElement, 'emailError');
    createErrorElement(passwordInput.parentElement, 'passwordError');
    
    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    passwordInput.addEventListener('blur', validatePassword);
    signinForm.addEventListener('submit', handleSignInSubmit);
});

function createErrorElement(parent, id) {
    const errorSpan = document.createElement('span');
    errorSpan.id = id;
    errorSpan.className = 'error-message';
    parent.appendChild(errorSpan);
}

function showError(inputElement, errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    inputElement.classList.add('input-error');
    inputElement.classList.remove('input-success');
}

function showSuccess(inputElement, errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    inputElement.classList.remove('input-error');
    inputElement.classList.add('input-success');
}

function clearValidation(inputElement, errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    inputElement.classList.remove('input-error', 'input-success');
}

function validateEmail() {
    const email = document.getElementById('email');
    const emailValue = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailValue === '') {
        showError(email, 'emailError', 'Email is required');
        return false;
    } else if (!emailRegex.test(emailValue)) {
        showError(email, 'emailError', 'Please enter a valid email address');
        return false;
    } else {
        showSuccess(email, 'emailError');
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById('password');
    const passwordValue = password.value;
    
    if (passwordValue === '') {
        showError(password, 'passwordError', 'Password is required');
        return false;
    } else if (passwordValue.length < 6) {
        showError(password, 'passwordError', 'Password must be at least 6 characters');
        return false;
    } else {
        showSuccess(password, 'passwordError');
        return true;
    }
}

function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const icon = field.nextElementSibling;
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function handleSignInSubmit(event) {
    event.preventDefault();
    
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    if (isEmailValid && isPasswordValid) {
        const email = document.getElementById('email').value;
        showSuccessMessage('Sign In Successful! Welcome back.');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
}

function showSuccessMessage(message) {
    const existingMsg = document.querySelector('.success-message');
    if (existingMsg) existingMsg.remove();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    const form = document.getElementById('signinForm');
    form.insertBefore(successDiv, form.firstChild);
}