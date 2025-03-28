const bcrypt = require("bcrypt");

async function sendOTP() {
    let username = document.getElementById("username").value;
    let phone = document.getElementById("phone").value;

    if (!username || !phone) {
        document.getElementById("message").innerText = "Please enter both fields.";
        return;
    }

    try {
        let response = await fetch("http://localhost:5000/check-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, phone }),
        });

        let data = await response.json();

        if (response.ok) {
            let otp = Math.floor(1000 + Math.random() * 9000); // Generate OTP
            localStorage.setItem("otp", otp); // Store OTP locally (for demo)
            localStorage.setItem("username", username); // Store username for reset
            alert("Your OTP is: " + otp); // Simulating OTP via SMS
            document.getElementById("step1").style.display = "none";
            document.getElementById("step2").style.display = "block";
        } else {
            document.getElementById("message").innerText = data.message;
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").innerText = "Something went wrong!";
    }
}

function verifyOTP() {
    let userOTP = document.getElementById("otp").value;
    let storedOTP = localStorage.getItem("otp");

    if (userOTP === storedOTP) {
        document.getElementById("message").innerText = "OTP Verified!";
        document.getElementById("step2").style.display = "none";
        document.getElementById("step3").style.display = "block";
    } else {
        document.getElementById("message").innerText = "Invalid OTP. Try again.";
    }
}

async function resetPassword() {
    let newPassword = document.getElementById("newPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let username = localStorage.getItem("username"); // Get stored username

    if (newPassword !== confirmPassword) {
        document.getElementById("message").innerText = "Passwords do not match!";
        return;
    }

    // Hash the password before sending it to the backend
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    try {
        let response = await fetch("http://localhost:5000/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, newPassword: hashedPassword }),
        });

        let data = await response.json();

        if (response.ok) {
            alert("Password Reset Successfully! You can now log in.");
            localStorage.removeItem("otp"); // Clear OTP
            localStorage.removeItem("username"); // Clear stored username
            window.location.href = "index.html"; // Redirect to login page
        } else {
            document.getElementById("message").innerText = data.message;
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").innerText = "Something went wrong!";
    }
}
