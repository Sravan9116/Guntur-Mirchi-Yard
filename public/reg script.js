const sidebar = document.querySelector('.sidebar'); // Use the correct selector
const toggleBtn = document.querySelector('.toggle-btn');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// ================= Registration Type Selection =================
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Retrieve the selected registration type
    const registrationType = document.querySelector('input[name="type"]:checked').value;

    // Process registration type accordingly
    if (registrationType === 'Farmer') {
        handleFarmerRegistration();
    } else if (registrationType === 'Company') {
        handleCompanyRegistration();
    } else if (registrationType === 'Buyer') {
        handleBuyerRegistration();
    } else if (registrationType === 'Government') {
        handleGovernmentRegistration();
    } else {
        alert('Please select a valid registration type!');
    }
});

function handleFarmerRegistration() {
    alert('Farmer registration is being processed!');
    // Add Farmer-specific logic here
}

function handleCompanyRegistration() {
    alert('Company registration is being processed!');
    // Add Company-specific logic here
}

function handleBuyerRegistration() {
    alert('Buyer registration is being processed!');
    // Add Buyer-specific logic here
}

function handleGovernmentRegistration() {
    alert('Government registration is being processed!');
    // Add Government-specific logic here
}

