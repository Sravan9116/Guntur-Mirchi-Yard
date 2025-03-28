const sidebar = document.querySelector('.sidebar'); // Use the correct selector
const toggleBtn = document.querySelector('.toggle-btn');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Add event listener for the 'click' event on the 'getWeather' button
document.getElementById("getWeather").addEventListener("click", () => {
  const city = document.getElementById("city").value.trim(); // Get city input from the user
  const apiKey = "e6f4935367f2f943a924fd5aadec0484"; // Your Weatherstack API key
  const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`; // Weatherstack API URL

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error.info); // Display Weatherstack error messages
      }
      // Your logic to display weather data here
      document.getElementById("cityName").innerText = data.location.name;
      document.getElementById("temperature").innerText = `${data.current.temperature}°C`;
      document.getElementById("description").innerText = data.current.weather_descriptions[0];
    })
    .catch(error => {
      // Handle errors here (e.g., show error message)
      alert("Error: " + error.message);
    });
});

// Add event listener for the 'keydown' event on the 'city' input field (trigger on Enter key)
document.getElementById("city").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    // Trigger the same logic as the 'getWeather' button click
    const city = document.getElementById("city").value.trim();
    const apiKey = "e6f4935367f2f943a924fd5aadec0484"; // Your Weatherstack API key
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`; // Weatherstack API URL

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error.info); // Display Weatherstack error messages
        }
        // Your logic to display weather data here
        document.getElementById("cityName").innerText = data.location.name;
        document.getElementById("temperature").innerText = `${data.current.temperature}°C`;
        document.getElementById("description").innerText = data.current.weather_descriptions[0];
      })
      .catch(error => {
        // Handle errors here (e.g., show error message)
        alert("Error: " + error.message);
      });
  }
});

// JavaScript for Read-Only Page (file-2.js)

// Fetch updated prices from localStorage
function displayPrices() {
  const prices = JSON.parse(localStorage.getItem("prices")) || {};

  for (const [key, value] of Object.entries(prices)) {
    const priceElement = document.getElementById(key);
    if (priceElement) {
      priceElement.textContent = value;
    }
  }
}

// Call the function to display prices on page load
displayPrices();

// Response templates
const responseTemplates = {
  greeting: ["Hello there!", "Hi, how can I assist you today?", "Hey! What's up?"],
  feeling: ["I'm just a bot, but I'm here to help!", "Feeling great! What about you?"],
  name: ["I'm Srav, your friendly bot.", "You can call me Srav."],
  about: ["I'm a bot created to assist you with your queries.", "I'm here to help!"],
  fallback: ["Could you please rephrase that?", "I'm not sure what you mean."]
};

// Function to get a random response based on intent
function getResponse(intent) {
  const responses = responseTemplates[intent] || responseTemplates.fallback;
  return responses[Math.floor(Math.random() * responses.length)];
}

// Analyze intent based on input
function analyzeIntent(message) {
  const lowercasedMessage = message.toLowerCase();
  if (lowercasedMessage.includes("hello") || lowercasedMessage.includes("hi") || lowercasedMessage.includes("hey")) {
    return "greeting";
  } else if (lowercasedMessage.includes("how") || lowercasedMessage.includes("feeling")) {
    return "feeling";
  } else if (lowercasedMessage.includes("name")) {
    return "name";
  } else if (lowercasedMessage.includes("about")) {
    return "about";
  } else {
    return "fallback";
  }
}

// Handle user input and chatbot response
function handleChat() {
  const inputField = document.getElementById("chat-input");
  const messageContainer = document.getElementById("chatbot-messages");

  const userMessage = inputField.value.trim();
  if (userMessage === "") return; // Do nothing if input is empty

  // Append user's message with avatar
  appendMessage("user", userMessage, messageContainer, "chat.jpg");

  // Get bot's response
  const intent = analyzeIntent(userMessage);
  const botResponse = getResponse(intent);

  // Append bot's response with avatar
  appendMessage("bot", botResponse, messageContainer, "chatbot.png");

  // Clear input and scroll to the bottom
  inputField.value = "";
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Helper function to append a message with avatar
function appendMessage(sender, message, container, avatar) {
  const messageContainer = document.createElement("div");
  messageContainer.className = `message-container ${sender}`;

  const avatarImg = document.createElement("img");
  avatarImg.src = avatar;
  avatarImg.alt = `${sender} avatar`;

  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = message;

  messageContainer.appendChild(sender === "bot" ? avatarImg : messageDiv);
  messageContainer.appendChild(sender === "bot" ? messageDiv : avatarImg);

  container.appendChild(messageContainer);
}

// Toggle chatbot visibility with transition
document.getElementById("chatbot-logo").addEventListener("click", () => {
  const chatbot = document.getElementById("chatbot");
  chatbot.classList.add("show"); // Add the 'show' class to make the chatbot visible
});

document.getElementById("close-btn").addEventListener("click", () => {
  const chatbot = document.getElementById("chatbot");
  chatbot.classList.remove("show"); // Remove the 'show' class to hide the chatbot
});

// Attach event listener to send button
document.getElementById("send-btn").addEventListener("click", handleChat);

// Allow Enter key to send message
document.getElementById("chat-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    handleChat();
  }
});

const scrollAd = document.getElementById('scroll-ad');
const scrollContent = document.getElementById('scroll-content');

// Toggle scrolling when the user clicks
scrollAd.addEventListener('click', () => {
  if (scrollContent.classList.contains('scroll-paused')) {
    scrollContent.classList.remove('scroll-paused'); // Resume scrolling
  } else {
    scrollContent.classList.add('scroll-paused'); // Pause scrolling
  }
});
window.onload = function () {
  const profilePic = localStorage.getItem("profilePicture");
  const username = localStorage.getItem("username");

  if (profilePic) {
      document.getElementById("profilePicture").src = profilePic;
  }

  if (username) {
      document.getElementById("username").textContent = "Welcome, " + username;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const profilePicture = document.getElementById("profilePicture");
  const dropdown = document.getElementById("dropdown");
  const dropdownName = document.getElementById("dropdownName");
  const dropdownUserId = document.getElementById("dropdownuserId");

  // Toggle dropdown visibility
  profilePicture.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("hidden");
  });

  // Close the dropdown when clicking outside
  document.addEventListener("click", (e) => {
      if (!profilePicture.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.add("hidden");
      }
  });

  // Fetch username and userId from localStorage
  const storedUsername = localStorage.getItem("username") || "Unknown";
  const storedUserId = localStorage.getItem("userId") || "Unknown";

  if (dropdownName) dropdownName.textContent =`User Name: ${storedUsername}`;
  if (dropdownUserId) dropdownUserId.textContent = `User ID: ${storedUserId}`;
});

// Handle Registration
function registerUser() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch('http://localhost:3001/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
  })
  .then(response => response.json())
  .then(data => {
      console.log("API Response:", data); // Check the structure of the response

      if (data.userId ) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);

        window.location.href = "Main Page.html";
      } else {
          alert("Registration failed. Please try again.");
      }
  })
  .catch(error => console.error("Error:", error));
}
// Handle Logout
function logOut() {
  localStorage.removeItem('userId');
  window.location.href = "index.html"; // Redirect to home page
}
