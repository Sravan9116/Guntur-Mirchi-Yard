// Function to restrict alphabets and allow only numeric input
function restrictAlphabets(e) {
    const char = String.fromCharCode(e.which || e.keyCode);
    return /^\d$/.test(char); // Allow only digits
}

// Add event listeners to input fields for restricting alphabets
document.addEventListener("DOMContentLoaded", () => {
    const phoneNumberInput = document.querySelector('input[placeholder="Govt Phone Number"]');
    const govtIdInput = document.querySelector('input[placeholder="Govt ID"]');

    if (phoneNumberInput) {
        phoneNumberInput.addEventListener("keypress", restrictAlphabets);
    }

    if (govtIdInput) {
        govtIdInput.addEventListener("keypress", restrictAlphabets);
    }
});

// Toggle Sidebar Menu
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".toggle-btn");
    const sidebar = document.querySelector(".sidebar");

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("active");
        });
    }
});
