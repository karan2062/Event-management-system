// Contact Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Create error message elements
    createErrorElement(nameInput.parentElement, 'nameError');
    createErrorElement(emailInput.parentElement, 'emailError');
    createErrorElement(subjectInput.parentElement, 'subjectError');
    createErrorElement(messageInput.parentElement, 'messageError');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    nameInput.addEventListener('blur', validateName);
    
    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);
    
    subjectInput.addEventListener('input', validateSubject);
    subjectInput.addEventListener('blur', validateSubject);
    
    messageInput.addEventListener('input', validateMessage);
    messageInput.addEventListener('blur', validateMessage);
    
    // Form submission
    contactForm.addEventListener('submit', handleContactSubmit);
    
    // Handle Sign In and Sign Up buttons
    const signInBtn = document.querySelector('.sign-in');
    const signUpBtn = document.querySelector('.sign-up');
    
    if (signInBtn) {
        signInBtn.addEventListener('click', function() {
            window.location.href = 'signin.html';
        });
    }
    
    if (signUpBtn) {
        signUpBtn.addEventListener('click', function() {
            window.location.href = 'signup.html';
        });
    }
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

function validateName() {
    const name = document.getElementById('name');
    const value = name.value.trim();
    
    if (value === '') {
        showError(name, 'nameError', 'Name is required');
        return false;
    } else if (value.length < 2) {
        showError(name, 'nameError', 'Name must be at least 2 characters');
        return false;
    } else {
        showSuccess(name, 'nameError');
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

function validateSubject() {
    const subject = document.getElementById('subject');
    const value = subject.value.trim();
    
    if (value === '') {
        showError(subject, 'subjectError', 'Subject is required');
        return false;
    } else if (value.length < 3) {
        showError(subject, 'subjectError', 'Subject must be at least 3 characters');
        return false;
    } else {
        showSuccess(subject, 'subjectError');
        return true;
    }
}

function validateMessage() {
    const message = document.getElementById('message');
    const value = message.value.trim();
    
    if (value === '') {
        showError(message, 'messageError', 'Message is required');
        return false;
    } else if (value.length < 10) {
        showError(message, 'messageError', 'Message must be at least 10 characters');
        return false;
    } else {
        showSuccess(message, 'messageError');
        return true;
    }
}

function handleContactSubmit(event) {
    event.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();
    
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // All validations passed - show success message
        showSuccessMessage('Thank you! Your message has been sent successfully.');
        
        // Reset form after delay
        setTimeout(() => {
            document.getElementById('contactForm').reset();
            // Remove success classes
            document.querySelectorAll('.input-success').forEach(el => {
                el.classList.remove('input-success');
            });
        }, 2000);
    }
}

function showSuccessMessage(message) {
    // Remove existing success message if any
    const existingMsg = document.querySelector('.success-message');
    if (existingMsg) existingMsg.remove();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    const form = document.getElementById('contactForm');
    form.insertBefore(successDiv, form.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}
