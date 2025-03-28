document.getElementById('LoginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = { username, password };

    try {
        console.log('Sending login request with data:', data);
        const response = await fetch('http://192.168.137.1:3001/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("API Response:", result); // Debugging response

        if (response.ok) {
            alert('Login successful');

            // ✅ Store user details with profile picture
            const userDetails = { 
                username: result.user?.username || "Unknown", 
                userId: result.user?.userid || "N/A",  // ✅ Fix `userId`
                profilePic: result.user?.profilePic || "default-profile.png" // ⚠️ Backend must return this field
            };

            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            localStorage.setItem('authToken', result.token);

            console.log("Stored user details:", localStorage.getItem("userDetails")); // Debug
            window.location.href = 'Main Page.html';
        } else {
            alert('Error: ' + (result.message || "Login failed"));
        }
    } catch (error) {
        alert('Error connecting to the server');
        console.error(error);
    }
});

// ✅ Password visibility toggle
const passwordField = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("mousedown", () => passwordField.type = "text");
togglePassword.addEventListener("mouseup", () => passwordField.type = "password");
togglePassword.addEventListener("mouseleave", () => passwordField.type = "password");