// Side Bar Active
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.toggle-btn');

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Weather API Integration
document.getElementById("getWeather")?.addEventListener("click", fetchWeather);
document.getElementById("city")?.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        fetchWeather();
    }
});

function fetchWeather() {
    const city = document.getElementById("city").value.trim();
    if (!city) return alert("Please enter a city");

    const apiKey = "e6f4935367f2f943a924fd5aadec0484";
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) throw new Error(data.error.info);
            sessionStorage.setItem("weatherData", JSON.stringify(data));
            window.location.href = "crop predication.html";
        })
        .catch(error => alert("Error: " + error.message));
}

// Display Prices from Local Storage
function displayPrices() {
    const prices = JSON.parse(localStorage.getItem("prices")) || {};
    Object.entries(prices).forEach(([key, value]) => {
        const priceElement = document.getElementById(key);
        if (priceElement) priceElement.textContent = value;
    });
}
displayPrices();

// Chatbot Functionality
const responseTemplates = {
    greeting: ["Hello there!", "Hi, how can I assist you today?", "Hey! What's up?"],
    feeling: ["I'm just a bot, but I'm here to help!", "Feeling great! What about you?"],
    name: ["I'm Srav, your friendly bot.", "You can call me Srav."],
    about: ["I'm a bot created to assist you with your queries.", "I'm here to help!"],
    fallback: ["Could you please rephrase that?", "I'm not sure what you mean."]
};

function analyzeIntent(message) {
    const lowercasedMessage = message.toLowerCase();
    if (/hello|hi|hey/.test(lowercasedMessage)) return "greeting";
    if (/how|feeling/.test(lowercasedMessage)) return "feeling";
    if (/name/.test(lowercasedMessage)) return "name";
    if (/about/.test(lowercasedMessage)) return "about";
    return "fallback";
}

function handleChat() {
    const inputField = document.getElementById("chat-input");
    const messageContainer = document.getElementById("chatbot-messages");
    const userMessage = inputField.value.trim();
    if (!userMessage) return;

    appendMessage("user", userMessage, messageContainer, "chat.jpg");
    setTimeout(() => {
        appendMessage("bot", responseTemplates[analyzeIntent(userMessage)][0], messageContainer, "chatbot.png");
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }, 500);
    inputField.value = "";
}

function appendMessage(sender, message, container, avatar) {
    const messageContainer = document.createElement("div");
    messageContainer.className = `message-container ${sender}`;

    const avatarImg = document.createElement("img");
    avatarImg.src = avatar;
    avatarImg.alt = `${sender} avatar`;

    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = message;

    sender === "bot" ? messageContainer.append(avatarImg, messageDiv) : messageContainer.append(messageDiv, avatarImg);
    container.appendChild(messageContainer);
    container.scrollTop = container.scrollHeight;
}

document.getElementById("chatbot-logo")?.addEventListener("click", () => {
    document.getElementById("chatbot").classList.add("show");
    document.getElementById("chatbot-bubble")?.classList.remove("show-bubble");
});

document.getElementById("close-btn")?.addEventListener("click", () => {
    document.getElementById("chatbot").classList.remove("show");
});

document.getElementById("send-btn")?.addEventListener("click", handleChat);
document.getElementById("chat-input")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleChat();
});

window.onload = function () {
    const bubble = document.getElementById("chatbot-bubble");
    if (bubble) {
        setTimeout(() => bubble.classList.add("show-bubble"), 500);
        setTimeout(() => bubble.classList.remove("show-bubble"), 10000);
    }
};

// Profile Display Section
document.addEventListener("DOMContentLoaded", () => {
  const profilePicture = document.getElementById("profilePicture");
  const dropdown = document.getElementById("dropdown");
  const dropdownName = document.getElementById("dropdownName");
  const dropdownUserId = document.getElementById("dropdownUserId");

  profilePicture?.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown?.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
      if (!profilePicture?.contains(e.target) && !dropdown?.contains(e.target)) {
          dropdown?.classList.add("hidden");
      }
  });

  function updateUserDetails() {
      const userDetailsString = localStorage.getItem("userDetails");

      if (!userDetailsString) {
          console.error("User details missing in localStorage!");
          return;
      }

      const userDetails = JSON.parse(userDetailsString);
      console.log("Loaded user details:", userDetails); // Debugging

      if (!userDetails.username || !userDetails.userId) {
          console.error("User details are incomplete:", userDetails);
          return;
      }

      dropdownName.textContent = `User Name: ${userDetails.username}`;
      dropdownUserId.textContent = `User ID: ${userDetails.userId}`;

      const profilePicture = document.getElementById("profilePicture");
      profilePicture.src = userDetails.profilePic || "default-profile.png"; 
  }

  if (localStorage.getItem("authToken")) updateUserDetails();
});

// ✅ Function to Logout
function logOut() {
  localStorage.removeItem("userDetails");
  localStorage.removeItem("authToken");
  window.location.href = "index.html"; // Redirect to login page
}


// Scrolling Ad Function

const scrollAd = document.getElementById("scroll-ad");
    const scrollContent = document.getElementById("scroll-content");

    let isStopped = false; // Track whether scrolling is stopped

    // Pause scrolling on hover
    scrollAd.addEventListener("mouseenter", () => {
        if (!isStopped) {
            scrollContent.style.animationPlayState = "paused";
        }
    });

    // Resume scrolling when the mouse leaves
    scrollAd.addEventListener("mouseleave", () => {
        if (!isStopped) {
            scrollContent.style.animationPlayState = "running";
        }
    });