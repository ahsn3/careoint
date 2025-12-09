// Language and RTL Support
let currentLanguage = 'en';
window.currentLanguage = currentLanguage; // Make it globally accessible
const htmlElement = document.documentElement;


// Initialize language
function initLanguage() {
    const savedLanguage = localStorage.getItem('carepoint-language') || 'en';
    setLanguage(savedLanguage);
    
    // Set the language select dropdown value
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = savedLanguage;
    }
}

function setLanguage(lang) {
    currentLanguage = lang;
    window.currentLanguage = lang; // Update global reference
    htmlElement.setAttribute('lang', lang);
    htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-en]').forEach(element => {
        if (element.tagName === 'INPUT' && element.hasAttribute('data-placeholder-en')) {
            const placeholder = element.getAttribute(`data-placeholder-${lang}`);
            if (placeholder) element.placeholder = placeholder;
        } else {
            const text = element.getAttribute(`data-${lang}`);
            if (text) element.textContent = text;
        }
    });
    
    // Update language dropdown
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = lang;
    }
    
    // Re-populate doctor dropdown with new language
    if (typeof populateDoctorSelect === 'function') {
        populateDoctorSelect();
    }
    
    // Save language preference
    localStorage.setItem('carepoint-language', lang);
    
    // Update auth navigation buttons if function exists
    if (typeof updateAuthNavigation === 'function') {
        updateAuthNavigation();
    }
}

// Language select event
document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
});


// Time slots (3 PM to 9 PM)
const timeSlots = [
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
];

// Initialize the application
function initApp() {
    initLanguage();
    renderDoctors();
    setupEventListeners();
    setMinDate();
    populateDoctorSelect();
    populatePatientData();
}

// Populate patient data if logged in
function populatePatientData() {
    if (window.auth && window.auth.isLoggedIn() && window.auth.getCurrentUserRole() === 'patient') {
        const user = window.auth.getCurrentUser();
        const patientName = document.getElementById('patientName');
        const patientPhone = document.getElementById('patientPhone');
        
        if (patientName && user.name) {
            patientName.value = user.name;
        }
        if (patientPhone && user.phone) {
            patientPhone.value = user.phone;
        }
    }
}

// Render doctors in the grid
function renderDoctors(filteredDoctors = doctors) {
    const doctorsGrid = document.getElementById('doctorsGrid');
    if (!doctorsGrid) return;
    
    doctorsGrid.innerHTML = '';

    filteredDoctors.forEach(doctor => {
        const doctorCard = document.createElement('div');
        doctorCard.className = 'doctor-card fade-in';
        doctorCard.innerHTML = `
            <div class="doctor-image">
                <i class="fas fa-${doctor.gender === 'male' ? 'user-md' : 'user-nurse'}"></i>
            </div>
            <div class="doctor-info">
                <h3 class="doctor-name">${doctor.name[currentLanguage]} (${doctor.departmentName[currentLanguage]})</h3>
                <p class="doctor-department">${doctor.departmentName[currentLanguage]}</p>
                <p class="doctor-specialty">${doctor.specialty[currentLanguage]}</p>
                <button class="book-appointment-btn" onclick="openDoctorBooking(${doctor.id})" data-en="Book Appointment" data-ar="احجز موعد">Book Appointment</button>
            </div>
        `;
        doctorsGrid.appendChild(doctorCard);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Book Now button functionality
    const bookNowButton = document.querySelector('.cta-button');
    if (bookNowButton) {
        bookNowButton.addEventListener('click', () => {
            document.getElementById('appointments').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        });
    }

    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.querySelector('.main-nav');
    const navDropdown = document.querySelector('.nav-dropdown');

    if (hamburger && mainNav) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            hamburger.classList.toggle('active');
            mainNav.classList.toggle('active');
            console.log('Hamburger clicked, menu active:', mainNav.classList.contains('active'));
        });
    }

    // Mobile dropdown functionality
    if (navDropdown) {
        const dropdownToggle = navDropdown.querySelector('.dropdown-toggle');
        dropdownToggle.addEventListener('click', (e) => {
            e.preventDefault();
            navDropdown.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    if (mainNav) {
        mainNav.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link') || e.target.classList.contains('dropdown-link')) {
                mainNav.classList.remove('active');
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mainNav && hamburger && mainNav.classList.contains('active')) {
            if (!mainNav.contains(e.target) && !hamburger.contains(e.target)) {
                mainNav.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });

    // Doctor booking form submission
    const doctorBookingForm = document.getElementById('doctorBookingForm');
    if (doctorBookingForm) {
        doctorBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(doctorBookingForm);
            const appointmentData = {
                date: formData.get('doctorBookingDate'),
                time: formData.get('doctorBookingTime'),
                name: formData.get('patientName'),
                phone: formData.get('patientPhone'),
                email: formData.get('patientEmail'),
                notes: formData.get('appointmentNotes')
            };
            
            // If user is logged in as patient, save appointment to their record
            if (window.auth && window.auth.isLoggedIn() && window.auth.getCurrentUserRole() === 'patient') {
                const user = window.auth.getCurrentUser();
                const doctorId = document.getElementById('doctorBookingModal').dataset.doctorId;
                if (doctorId) {
                    appointmentData.doctorId = doctorId;
                    const doctor = doctors.find(d => d.id == doctorId);
                    if (doctor) {
                        appointmentData.doctor = doctor.name[currentLanguage];
                    }
                }
                window.auth.addPatientAppointment(user.id, appointmentData);
            }
            
            // Show success modal
            document.getElementById('successModal').style.display = 'block';
            
            // Close doctor booking modal
            closeDoctorBooking();
        });
    }

    // Department cards now link to individual pages - no click handler needed

    // CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            document.getElementById('appointments').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Doctor selection
    const selectedDoctor = document.getElementById('selectedDoctor');
    if (selectedDoctor) {
        selectedDoctor.addEventListener('change', updateTimeSlots);
    }

    // Date selection
    const appointmentDate = document.getElementById('appointmentDate');
    if (appointmentDate) {
        appointmentDate.addEventListener('change', updateTimeSlots);
    }

    // Book appointment
    const bookButton = document.querySelector('.book-button');
    if (bookButton) {
        bookButton.addEventListener('click', bookAppointment);
    }

    // Modal close
    const modal = document.getElementById('successModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}






// Set minimum date to tomorrow
function setMinDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateInput = document.getElementById('appointmentDate');
    dateInput.min = tomorrow.toISOString().split('T')[0];
}

// Populate doctor select dropdown
function populateDoctorSelect() {
    const selectedDoctor = document.getElementById('selectedDoctor');
    if (!selectedDoctor) return;
    
    const lang = currentLanguage || 'en';
    const chooseText = lang === 'ar' ? 'اختر طبيب' : lang === 'tr' ? 'Bir doktor seçin' : 'Choose a doctor';
    selectedDoctor.innerHTML = `<option value="" data-en="Choose a doctor" data-ar="اختر طبيب" data-tr="Bir doktor seçin">${chooseText}</option>`;

    doctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.id;
        const doctorName = doctor.name[lang] || doctor.name['en'];
        const deptName = doctor.departmentName[lang] || doctor.departmentName['en'];
        option.textContent = `${doctorName} (${deptName})`;
        selectedDoctor.appendChild(option);
    });
}

// Update time slots based on selected doctor and date
function updateTimeSlots() {
    const selectedDoctor = document.getElementById('selectedDoctor').value;
    const appointmentDate = document.getElementById('appointmentDate').value;
    const appointmentTime = document.getElementById('appointmentTime');

    appointmentTime.innerHTML = '<option value="" data-en="Choose time" data-ar="اختر الوقت">Choose time</option>';

    if (selectedDoctor && appointmentDate) {
        // Simulate some time slots being booked (random for demo)
        const availableSlots = timeSlots.filter(() => Math.random() > 0.3);
        
        availableSlots.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            appointmentTime.appendChild(option);
        });
    }
}

// Book appointment
function bookAppointment() {
    const selectedDoctor = document.getElementById('selectedDoctor').value;
    const appointmentDate = document.getElementById('appointmentDate').value;
    const appointmentTime = document.getElementById('appointmentTime').value;
    const patientName = document.getElementById('patientName').value;
    const patientPhone = document.getElementById('patientPhone').value;

    // Validation
    if (!selectedDoctor || !appointmentDate || !appointmentTime || !patientName || !patientPhone) {
        alert(currentLanguage === 'en' ? 'Please fill in all fields' : 'يرجى ملء جميع الحقول');
        return;
    }

    // Get doctor name
    const doctor = doctors.find(d => d.id == selectedDoctor);
    const doctorName = doctor ? doctor.name[currentLanguage] : '';

    // Create appointment data
    const appointmentData = {
        doctor: doctorName,
        doctorId: selectedDoctor,
        date: appointmentDate,
        time: appointmentTime,
        patient: patientName,
        phone: patientPhone
    };

    // If user is logged in as patient, save appointment to their record
    if (window.auth && window.auth.isLoggedIn() && window.auth.getCurrentUserRole() === 'patient') {
        const user = window.auth.getCurrentUser();
        window.auth.addPatientAppointment(user.id, appointmentData);
    }

    // Simulate booking (in real app, this would send data to server)
    console.log('Appointment booked:', appointmentData);

    // Show success modal
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';

    // Reset form
    document.getElementById('selectedDoctor').value = '';
    document.getElementById('appointmentDate').value = '';
    document.getElementById('appointmentTime').innerHTML = '<option value="" data-en="Choose time" data-ar="اختر الوقت">Choose time</option>';
    document.getElementById('patientName').value = '';
    document.getElementById('patientPhone').value = '';
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navigation
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navigation');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > 100) {
        nav.classList.add('show');
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.backdropFilter = 'blur(10px)';
    } else {
        nav.classList.remove('show');
        nav.style.background = 'white';
        nav.style.backdropFilter = 'none';
    }
    
    // Hide navigation when scrolling down, show when scrolling up
    if (currentScroll > lastScrollTop && currentScroll > 200) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Doctor booking modal functions
function openDoctorBooking(doctorId) {
    const doctor = doctors.find(d => d.id === doctorId);
    if (!doctor) return;
    
    const modal = document.getElementById('doctorBookingModal');
    const title = document.getElementById('doctorBookingTitle');
    const doctorInfo = document.getElementById('selectedDoctorInfo');
    
    // Store doctor ID in modal for later use
    modal.dataset.doctorId = doctorId;
    
    // Update title and doctor info
    title.textContent = `${title.getAttribute('data-en')} ${doctor.name[currentLanguage]}`;
    doctorInfo.innerHTML = `
        <div class="doctor-booking-card">
            <div class="doctor-booking-image">
                <i class="fas fa-${doctor.gender === 'male' ? 'user-md' : 'user-nurse'}"></i>
            </div>
            <div class="doctor-booking-details">
                <h3>${doctor.name[currentLanguage]}</h3>
                <p>${doctor.departmentName[currentLanguage]}</p>
                <p>${doctor.specialty[currentLanguage]}</p>
            </div>
        </div>
    `;
    
    // Set minimum date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('doctorBookingDate').min = tomorrow.toISOString().split('T')[0];
    
    // Clear form
    document.getElementById('doctorBookingForm').reset();
    document.getElementById('doctorBookingTime').innerHTML = '<option value="" data-en="Choose time" data-ar="اختر الوقت">Choose time</option>';
    
    // Populate patient data if logged in
    if (window.auth && window.auth.isLoggedIn() && window.auth.getCurrentUserRole() === 'patient') {
        const user = window.auth.getCurrentUser();
        const patientName = document.getElementById('doctorBookingForm').querySelector('#patientName');
        const patientPhone = document.getElementById('doctorBookingForm').querySelector('#patientPhone');
        const patientEmail = document.getElementById('doctorBookingForm').querySelector('#patientEmail');
        
        if (patientName && user.name) patientName.value = user.name;
        if (patientPhone && user.phone) patientPhone.value = user.phone;
        if (patientEmail && user.email) patientEmail.value = user.email;
    }
    
    // Show modal
    modal.style.display = 'block';
    
    // Add event listener for date change
    document.getElementById('doctorBookingDate').addEventListener('change', updateDoctorBookingTimeSlots);
}

function closeDoctorBooking() {
    const modal = document.getElementById('doctorBookingModal');
    modal.style.display = 'none';
}

function updateDoctorBookingTimeSlots() {
    const dateInput = document.getElementById('doctorBookingDate');
    const timeSelect = document.getElementById('doctorBookingTime');
    
    if (!dateInput.value) return;
    
    timeSelect.innerHTML = '<option value="" data-en="Choose time" data-ar="اختر الوقت">Choose time</option>';
    
    // Simulate some time slots being booked (random for demo)
    const availableSlots = timeSlots.filter(() => Math.random() > 0.3);
    
    availableSlots.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initApp();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add some interactive animations
document.addEventListener('DOMContentLoaded', () => {
    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: isMobile ? 0.05 : 0.1,
        rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // For mobile, add a slight delay for smoother animation
                if (isMobile) {
                    entry.target.style.animationDelay = '0.1s';
                }
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.department-card, .doctor-card, .section-title').forEach(el => {
        observer.observe(el);
    });
    
    // Mobile-specific smooth scrolling improvements
    if (isMobile) {
        // Add touch-friendly scrolling
        document.body.style.webkitOverflowScrolling = 'touch';
        
        // Improve scroll performance on mobile
        let ticking = false;
        function updateScroll() {
            // Add any scroll-based animations here
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }
        });
    }
});
