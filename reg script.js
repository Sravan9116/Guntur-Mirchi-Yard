const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.toggle-btn');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// ================= Registration Type Selection =================
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Retrieve user inputs
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const registrationType = document.querySelector('input[name="type"]:checked');

    // Validate required fields
    if (!username || !password || !registrationType) {
        alert('Please fill in all fields and select a registration type!');
        return;
    }

    const userData = {
        username,
        password,
        type: registrationType.value
    };

    // Process registration based on type
    switch (registrationType.value) {
        case 'Farmer':
            handleFarmerRegistration(userData);
            break;
        case 'Company':
            handleCompanyRegistration(userData);
            break;
        case 'Buyer':
            handleBuyerRegistration(userData);
            break;
        case 'Government':
            handleGovernmentRegistration(userData);
            break;
        default:
            alert('Invalid registration type!');
    }
});

// ================= Registration Handlers =================
function handleFarmerRegistration(userData) {
    processRegistration(userData, 'Farmer');
}

function handleCompanyRegistration(userData) {
    processRegistration(userData, 'Company');
}

function handleBuyerRegistration(userData) {
    processRegistration(userData, 'Buyer');
}

function handleGovernmentRegistration(userData) {
    processRegistration(userData, 'Government');
}

// ================= Process Registration & Store Data =================
function processRegistration(userData, role) {
    alert(`${role} registration is being processed!`);

    // Simulate backend response (store user details in localStorage)
    localStorage.setItem('registeredUser', JSON.stringify(userData));

    // Redirect to login page after successful registration
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}