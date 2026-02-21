// Event Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('eventForm');
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('eventDate').setAttribute('min', today);
    
    // Form submission
    eventForm.addEventListener('submit', handleEventSubmit);
});

let currentStep = 1;

function nextStep() {
    // Validate current step
    if (currentStep === 1) {
        const selectedEvent = document.querySelector('input[name="eventType"]:checked');
        if (!selectedEvent) {
            showAlert('Please select an event type');
            return;
        }
    }
    
    // Move to next step
    currentStep = 2;
    updateStepUI();
}

function prevStep() {
    currentStep = 1;
    updateStepUI();
}

function updateStepUI() {
    // Update step indicators
    const steps = document.querySelectorAll('.step');
    const stepLine = document.querySelector('.step-line');
    
    steps.forEach((step, index) => {
        const stepNum = index + 1;
        if (stepNum <= currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
        if (stepNum < currentStep) {
            step.classList.add('completed');
        } else {
            step.classList.remove('completed');
        }
    });
    
    if (currentStep === 2) {
        stepLine.classList.add('active');
    } else {
        stepLine.classList.remove('active');
    }
    
    // Show/hide form steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(`step${currentStep}`).classList.add('active');
    
    // Scroll to top of form
    document.querySelector('.event-box').scrollIntoView({ behavior: 'smooth' });
}

function validateStep2() {
    let isValid = true;
    const requiredFields = [
        { id: 'eventName', message: 'Event name is required' },
        { id: 'eventDate', message: 'Event date is required' },
        { id: 'eventTime', message: 'Event time is required' },
        { id: 'eventDuration', message: 'Please select event duration' },
        { id: 'expectedGuests', message: 'Number of expected guests is required' },
        { id: 'eventVenue', message: 'Venue is required' },
        { id: 'eventAddress', message: 'Address is required' },
        { id: 'organizerName', message: 'Organizer name is required' },
        { id: 'organizerEmail', message: 'Organizer email is required' },
        { id: 'organizerPhone', message: 'Contact phone is required' }
    ];
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field.id);
        const value = input.value.trim();
        
        if (!value) {
            showFieldError(input, field.message);
            isValid = false;
        } else {
            input.classList.add('input-success');
        }
    });
    
    // Email validation
    const email = document.getElementById('organizerEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value && !emailRegex.test(email.value)) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Phone validation
    const phone = document.getElementById('organizerPhone');
    const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
    if (phone.value && !phoneRegex.test(phone.value)) {
        showFieldError(phone, 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Date validation - must be future date
    const eventDate = document.getElementById('eventDate');
    const selectedDate = new Date(eventDate.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showFieldError(eventDate, 'Event date must be in the future');
        isValid = false;
    }
    
    // Guest count validation
    const guests = document.getElementById('expectedGuests');
    if (guests.value && parseInt(guests.value) < 1) {
        showFieldError(guests, 'Number of guests must be at least 1');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(input, message) {
    input.classList.remove('input-success');
    input.classList.add('input-error');
    
    // Remove existing error message if any
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    const errorSpan = document.createElement('span');
    errorSpan.className = 'error-message';
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
    input.parentElement.appendChild(errorSpan);
}

function showAlert(message) {
    // Create a custom alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'custom-alert';
    alertDiv.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #dc3545;
        color: white;
        padding: 15px 30px;
        border-radius: 10px;
        z-index: 2000;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 10px 30px rgba(220, 53, 69, 0.4);
        animation: slideDown 0.3s ease;
    `;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
}

function handleEventSubmit(event) {
    event.preventDefault();
    
    // Validate step 2
    if (!validateStep2()) {
        return;
    }
    
    // Gather form data
    const formData = {
        eventType: document.querySelector('input[name="eventType"]:checked').value,
        eventName: document.getElementById('eventName').value,
        eventDate: document.getElementById('eventDate').value,
        eventTime: document.getElementById('eventTime').value,
        eventDuration: document.getElementById('eventDuration').value,
        expectedGuests: document.getElementById('expectedGuests').value,
        eventVenue: document.getElementById('eventVenue').value,
        eventAddress: document.getElementById('eventAddress').value,
        eventDescription: document.getElementById('eventDescription').value,
        organizerName: document.getElementById('organizerName').value,
        organizerEmail: document.getElementById('organizerEmail').value,
        organizerPhone: document.getElementById('organizerPhone').value,
        budget: document.getElementById('budget').value,
        services: Array.from(document.querySelectorAll('input[name="services"]:checked')).map(el => el.value),
        specialRequests: document.getElementById('specialRequests').value
    };
    
    // Display success modal
    showSuccessModal(formData);
}

function showSuccessModal(data) {
    const modal = document.getElementById('successModal');
    const summary = document.getElementById('eventSummary');
    
    // Format event type
    const eventTypeLabels = {
        'conference': 'Conference',
        'wedding': 'Wedding',
        'birthday': 'Birthday Party',
        'corporate': 'Corporate Event',
        'concert': 'Concert',
        'workshop': 'Workshop'
    };
    
    // Format date
    const eventDate = new Date(data.eventDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    summary.innerHTML = `
        <p><strong>Event Type:</strong> ${eventTypeLabels[data.eventType] || data.eventType}</p>
        <p><strong>Event Name:</strong> ${data.eventName}</p>
        <p><strong>Date:</strong> ${eventDate}</p>
        <p><strong>Time:</strong> ${data.eventTime}</p>
        <p><strong>Duration:</strong> ${data.eventDuration} hour(s)</p>
        <p><strong>Venue:</strong> ${data.eventVenue}</p>
        <p><strong>Expected Guests:</strong> ${data.expectedGuests}</p>
        <p><strong>Organizer:</strong> ${data.organizerName}</p>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
    
    // Reset form and go back to step 1
    document.getElementById('eventForm').reset();
    currentStep = 1;
    updateStepUI();
    
    // Redirect to home
    window.location.href = 'index.html';
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Real-time validation for inputs
document.addEventListener('input', function(e) {
    const input = e.target;
    if (input.classList.contains('input-error')) {
        input.classList.remove('input-error');
        const errorMsg = input.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
    }
});
