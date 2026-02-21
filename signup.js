
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    

    createErrorElement(firstNameInput.parentElement, 'firstNameError');
    createErrorElement(lastNameInput.parentElement, 'lastNameError');
    createErrorElement(emailInput.parentElement, 'emailError');
    createErrorElement(phoneInput.parentElement, 'phoneError');
    createErrorElement(passwordInput.parentElement, 'passwordError');
    createErrorElement(confirmPasswordInput.parentElement, 'confirmPasswordError');
    

    firstNameInput.addEventListener('input', validateFirstName);
    firstNameInput.addEventListener('blur', validateFirstName);
    
    lastNameInput.addEventListener('input', validateLastName);
    lastNameInput.addEventListener('blur', validateLastName);
    
    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);
    
    phoneInput.addEventListener('input', validatePhone);
    phoneInput.addEventListener('blur', validatePhone);
    
    passwordInput.addEventListener('input', function() {
        validatePassword();
        updatePasswordRequirements();
        if (confirmPasswordInput.value) {
            validateConfirmPassword();
        }
    });
    passwordInput.addEventListener('blur', validatePassword);
    
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    signupForm.addEventListener('submit', handleSignUpSubmit);
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

function validateFirstName() {
    const firstName = document.getElementById('firstName');
    const value = firstName.value.trim();
    const nameRegex = /^[a-zA-Z]+$/;
    
    if (value === '') {
        showError(firstName, 'firstNameError', 'First name is required');
        return false;
    } else if (value.length < 2) {
        showError(firstName, 'firstNameError', 'First name must be at least 2 characters');
        return false;
    } else if (!nameRegex.test(value)) {
        showError(firstName, 'firstNameError', 'First name can only contain letters');
        return false;
    } else {
        showSuccess(firstName, 'firstNameError');
        return true;
    }
}

function validateLastName() {
    const lastName = document.getElementById('lastName');
    const value = lastName.value.trim();
    const nameRegex = /^[a-zA-Z]+$/;
    
    if (value === '') {
        showError(lastName, 'lastNameError', 'Last name is required');
        return false;
    } else if (value.length < 2) {
        showError(lastName, 'lastNameError', 'Last name must be at least 2 characters');
        return false;
    } else if (!nameRegex.test(value)) {
        showError(lastName, 'lastNameError', 'Last name can only contain letters');
        return false;
    } else {
        showSuccess(lastName, 'lastNameError');
        return true;
    }
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

function validatePhone() {
    const phone = document.getElementById('phone');
    const phoneValue = phone.value.trim();
    const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
    
    if (phoneValue === '') {
        showError(phone, 'phoneError', 'Phone number is required');
        return false;
    } else if (!phoneRegex.test(phoneValue)) {
        showError(phone, 'phoneError', 'Please enter a valid phone number (10-15 digits)');
        return false;
    } else {
        showSuccess(phone, 'phoneError');
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById('password');
    const passwordValue = password.value;
    
    if (passwordValue === '') {
        showError(password, 'passwordError', 'Password is required');
        return false;
    } else if (passwordValue.length < 8) {
        showError(password, 'passwordError', 'Password must be at least 8 characters');
        return false;
    } else if (!/[A-Z]/.test(passwordValue)) {
        showError(password, 'passwordError', 'Password must contain at least one uppercase letter');
        return false;
    } else if (!/[0-9]/.test(passwordValue)) {
        showError(password, 'passwordError', 'Password must contain at least one number');
        return false;
    } else {
        showSuccess(password, 'passwordError');
        return true;
    }
}

function validateConfirmPassword() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const confirmValue = confirmPassword.value;
    
    if (confirmValue === '') {
        showError(confirmPassword, 'confirmPasswordError', 'Please confirm your password');
        return false;
    } else if (confirmValue !== password.value) {
        showError(confirmPassword, 'confirmPasswordError', 'Passwords do not match');
        return false;
    } else {
        showSuccess(confirmPassword, 'confirmPasswordError');
        return true;
    }
}

function updatePasswordRequirements() {
    const password = document.getElementById('password').value;
    const lengthReq = document.getElementById('length');
    if (password.length >= 8) {
        lengthReq.classList.add('valid');
    } else {
        lengthReq.classList.remove('valid');
    }
    
    const uppercaseReq = document.getElementById('uppercase');
    if (/[A-Z]/.test(password)) {
        uppercaseReq.classList.add('valid');
    } else {
        uppercaseReq.classList.remove('valid');
    }
    const numberReq = document.getElementById('number');
    if (/[0-9]/.test(password)) {
        numberReq.classList.add('valid');
    } else {
        numberReq.classList.remove('valid');
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

function validateTerms() {
    const termsCheckbox = document.querySelector('input[name="terms"]');
    return termsCheckbox.checked;
}

function handleSignUpSubmit(event) {
    event.preventDefault();
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isTermsAccepted = validateTerms();
    
    if (!isTermsAccepted) {
        alert('Please accept the Terms of Service and Privacy Policy');
        return;
    }
    
    if (isFirstNameValid && isLastNameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
        showSuccessMessage('Account Created Successfully! Redirecting to Sign In...');
        
        setTimeout(() => {
            window.location.href = 'signin.html';
        }, 2000);
    }
}

function showSuccessMessage(message) {
    const existingMsg = document.querySelector('.success-message');
    if (existingMsg) existingMsg.remove();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    const form = document.getElementById('signupForm');
    form.insertBefore(successDiv, form.firstChild);
}