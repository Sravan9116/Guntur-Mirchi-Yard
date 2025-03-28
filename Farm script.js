// Side Bar Active
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.toggle-btn');

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Farm details checking and redirecting the other page

async function validateUser() {
    const userid = document.querySelector(".input-box input[placeholder='Enter ID']").value;
    const phone = document.querySelector(".input-box input[placeholder='Phone Number']").value;
    const cropType = document.querySelector('input[placeholder="Crop Type"]').value;

    if (!userid || !phone || !cropType) {
        alert("Please enter User ID, Phone Number, and Crop Type");
        return;
    }

    try {
        const response = await fetch("http://localhost:3001/api/users/check-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userid, phone }),
        });

        const result = await response.json();

        if (result.success) {
            // Store crop type using correct key
            localStorage.setItem(`mirchiType_${userid}`, cropType);
            localStorage.setItem("currentFarmerID", userid);

            window.location.href = "link fam to buy.html"; // Redirect to the next page
        } else {
            alert("Invalid User ID or Phone Number");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Server error, please try again later.");
    }
}
