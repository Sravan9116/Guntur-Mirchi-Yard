document.getElementById('LoginForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form from submitting the traditional way

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {
        username: username,
        password: password,
    };

    try {
        console.log('Sending login request with data:', data);
        const response = await fetch('http://localhost:3001/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Login successful');
            console.log('Token:', result.token); // Store token in localStorage for future requests
            localStorage.setItem('authToken', result.token);
            window.location.href = 'Main Page.html'; // Redirect to the main website
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        alert('Error connecting to the server');
        console.error(error);
    }
});
